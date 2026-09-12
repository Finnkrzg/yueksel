'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { FormEvent, useState } from 'react'
import RevealTitle from './RevealTitle'

/** Test-E-Mail – vor Go-Live wieder auf Schneiderei.yueksel@gmail.com setzen */
const FORM_EMAIL = 'finnkrue@icloud.com'

type ContactProps = {
  address: string
  phone: string
  email: string
  openingHours?: string
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const inputClass =
  'w-full border-0 border-b border-olive-950/12 bg-transparent px-0 py-3 text-[0.95rem] font-light text-olive-950 placeholder:text-olive-800/30 outline-none transition-colors focus:border-terracotta-500/70'

export default function Contact({
  address,
  phone,
  email,
  openingHours,
}: ContactProps) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const links = [
    {
      label: address,
      href: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      external: true,
    },
    { label: phone, href: `tel:${phone.replace(/\s/g, '')}` },
    { label: email, href: `mailto:${email}` },
  ]

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const senderEmail = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(FORM_EMAIL)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name,
            email: senderEmail,
            message,
            _subject: `Anfrage von ${name} – Schneiderei Yüksel`,
            _template: 'table',
            _captcha: 'false',
          }),
        },
      )

      const data = (await response.json()) as {
        success?: string | boolean
        message?: string
      }

      const ok =
        data.success === true ||
        data.success === 'true' ||
        (response.ok && data.success !== 'false' && data.success !== false)

      if (!ok) {
        setStatus('error')
        setErrorMessage(
          data.message?.includes('Activation')
            ? 'Das Formular muss noch aktiviert werden – bitte prüfen Sie Ihr Postfach und klicken Sie den Link in der E-Mail von FormSubmit.'
            : 'Nachricht konnte nicht gesendet werden. Rufen Sie uns gerne an.',
        )
        return
      }

      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setErrorMessage('Verbindungsfehler. Bitte versuchen Sie es erneut.')
    }
  }

  return (
    <section
      id="contact"
      className="border-t border-olive-950/8 bg-sand-50 px-6 py-20 pb-[calc(5rem+env(safe-area-inset-bottom))] sm:py-28 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 max-w-xl sm:mb-16">
          <RevealTitle className="font-[family-name:var(--font-brand)] text-4xl tracking-[-0.03em] text-olive-950 md:text-5xl">
            Kontakt
          </RevealTitle>
          <p className="mt-4 font-light text-olive-800/65">
            Besuchen Sie uns in Maxglan – Parkplätze nebenan, drei Stellplätze.
          </p>
          {openingHours ? (
            <p className="mt-3 text-sm font-light text-olive-800/50">
              {openingHours}
            </p>
          ) : null}
        </div>

        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 xl:gap-28">
          <div className="divide-y divide-olive-950/10 border-y border-olive-950/10 font-light text-olive-900">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 + i * 0.08, duration: 0.55 }}
                className="group flex min-h-[3.5rem] items-center justify-between gap-4 py-4 transition-colors hover:text-terracotta-600 sm:py-5"
              >
                <span className="min-w-0 break-words">{link.label}</span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="shrink-0 text-terracotta-600 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] uppercase tracking-[0.32em] text-terracotta-600">
              Schreiben Sie uns
            </p>
            <p className="mt-3 max-w-md font-light text-olive-800/60">
              Eine kurze Nachricht genügt – wir melden uns so bald wie möglich.
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-10">
                <label className="block sm:col-span-1">
                  <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-olive-800/45">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Ihr Name"
                    className={inputClass}
                  />
                </label>

                <label className="block sm:col-span-1">
                  <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-olive-800/45">
                    E-Mail
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="ihre@email.at"
                    className={inputClass}
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-olive-800/45">
                    Nachricht
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Worum geht es?"
                    className={`${inputClass} resize-none pt-3`}
                  />
                </label>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex min-h-[3rem] items-center justify-center gap-2 self-start border border-olive-950/18 px-7 py-3 text-[0.78rem] uppercase tracking-[0.2em] text-olive-950 transition-all duration-300 hover:border-terracotta-500/45 hover:bg-terracotta-500/[0.04] hover:text-terracotta-600 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {status === 'sending' ? 'Wird gesendet …' : 'Absenden'}
                  {status !== 'sending' ? (
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  ) : null}
                </button>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.p
                      key="success"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm font-light text-olive-800/70"
                    >
                      <Check size={16} strokeWidth={1.5} className="text-terracotta-600" />
                      Vielen Dank – Ihre Nachricht wurde gesendet.
                    </motion.p>
                  ) : null}

                  {status === 'error' ? (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="max-w-xs text-sm font-light leading-relaxed text-terracotta-600"
                    >
                      {errorMessage}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
