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

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
    <div className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 sm:right-5 sm:bottom-5 md:right-8 md:bottom-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mb-4 flex h-[min(420px,65svh)] w-[min(100vw-2rem,360px)] flex-col overflow-hidden rounded-2xl border border-olive-900/10 bg-sand-50 shadow-[0_20px_60px_rgba(44,48,36,0.18)]"
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

      <motion.button
        type="button"
        aria-label={open ? 'Chat schließen' : 'Chat öffnen'}
        onClick={() => setOpen((value) => !value)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="ml-auto flex h-12 w-12 items-center justify-center rounded-full bg-olive-950 text-sand-50 shadow-[0_12px_30px_rgba(44,48,36,0.28)] sm:h-14 sm:w-14"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} strokeWidth={1.5} />}
      </motion.button>
    </div>
  )
}
