'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Send, X } from 'lucide-react'
import { FormEvent, useEffect, useRef, useState } from 'react'

type ChatRole = 'user' | 'bot'
type ChatMessage = { id: string; role: ChatRole; text: string }

const welcomeMessage: ChatMessage = {
  id: 'welcome',
  role: 'bot',
  text: 'Guten Tag – wie kann ich Ihnen helfen? Gerne zu Parkplätzen, Leistungen oder Ihrem Besuch bei uns.',
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

const HINT_STORAGE_KEY = 'yueksel-chat-hint-seen'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, loading, open])

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 180)
      return () => window.clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    if (sessionStorage.getItem(HINT_STORAGE_KEY)) return

    const reveal = () => {
      if (sessionStorage.getItem(HINT_STORAGE_KEY)) return
      sessionStorage.setItem(HINT_STORAGE_KEY, '1')
      setShowHint(true)
      window.setTimeout(() => setShowHint(false), 5200)
    }

    const onScroll = () => {
      if (window.scrollY > 80) reveal()
    }
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 4) reveal()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
    }
  }, [])

  async function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      text: trimmed,
    }

    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, text: msgText }) => ({
            role,
            text: msgText,
          })),
        }),
      })

      const data = (await res.json()) as { text?: string; error?: string }

      if (!res.ok || !data.text) {
        throw new Error(data.error || 'Antwort fehlgeschlagen.')
      }

      setMessages((prev) => [
        ...prev,
        { id: createId(), role: 'bot', text: data.text! },
      ])
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    void sendMessage(input)
  }

  return (
    <div className="fixed right-3 bottom-[calc(0.85rem+env(safe-area-inset-bottom))] z-50 sm:right-5 sm:bottom-5 md:right-8 md:bottom-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mb-3 flex h-[min(420px,68svh)] w-[min(calc(100vw-1.5rem),360px)] flex-col overflow-hidden rounded-2xl border border-olive-900/10 bg-sand-50 shadow-[0_20px_60px_rgba(44,48,36,0.18)] sm:mb-4 sm:h-[min(440px,65svh)]"
          >
            <div className="flex items-center justify-between border-b border-olive-900/8 bg-olive-950 px-4 py-3 text-sand-50">
              <div>
                <p className="text-sm font-medium">Schneiderei Yüksel</p>
                <p className="text-xs text-sand-100/60">Assistenz</p>
              </div>
              <button
                type="button"
                aria-label="Chat schließen"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 transition-colors hover:bg-white/10"
              >
                <X size={16} />
              </button>
            </div>

            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-terracotta-600 text-sand-50'
                        : 'bg-olive-100 text-olive-950'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-olive-100 px-3.5 py-2.5 text-sm text-olive-800/60">
                    schreibt…
                  </div>
                </div>
              )}

              {error && (
                <p className="text-xs leading-relaxed text-terracotta-600">
                  {error}
                </p>
              )}
            </div>

            <form
              onSubmit={onSubmit}
              className="border-t border-olive-900/8 p-3"
            >
              <div className="flex items-center gap-2 rounded-full bg-sand-100 px-3 py-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                  maxLength={800}
                  placeholder="Ihre Frage…"
                  className="w-full bg-transparent text-sm text-olive-900 outline-none placeholder:text-olive-800/40 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Nachricht senden"
                  className="rounded-full p-1.5 text-olive-950 transition-colors enabled:hover:text-terracotta-600 disabled:text-olive-800/35"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative ml-auto flex items-end justify-end">
        <AnimatePresence>
          {showHint && !open && (
            <motion.p
              initial={{ opacity: 0, x: 12, y: 6 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 8, y: 4 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-[3.6rem] bottom-1 w-max max-w-[min(13rem,calc(100vw-5rem))] rounded-2xl rounded-br-sm bg-olive-950 px-3.5 py-2.5 text-[0.8rem] leading-snug text-sand-50 shadow-[0_12px_28px_rgba(44,48,36,0.22)] sm:right-[4.25rem] sm:bottom-2 sm:max-w-[14rem]"
            >
              Fragen? Hier können Sie uns direkt schreiben.
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          aria-label={open ? 'Chat schließen' : 'Chat öffnen'}
          onClick={() => {
            setShowHint(false)
            setOpen((value) => !value)
          }}
          animate={
            showHint && !open
              ? { scale: [1, 1.08, 1], boxShadow: '0 0 0 10px rgba(188,115,86,0.22)' }
              : { scale: 1, boxShadow: '0 12px 30px rgba(44,48,36,0.28)' }
          }
          transition={
            showHint && !open
              ? { duration: 1.15, repeat: 3, ease: 'easeInOut' }
              : { duration: 0.25 }
          }
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-olive-950 text-sand-50 sm:h-14 sm:w-14"
        >
          {showHint && !open ? (
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-terracotta-500/35"
            />
          ) : null}
          {open ? <X size={20} /> : <MessageCircle size={20} strokeWidth={1.5} />}
        </motion.button>
      </div>
    </div>
  )
}
