'use client'

import { motion } from 'framer-motion'
import { FormEvent, useState } from 'react'
import RevealTitle from './RevealTitle'

type ContactProps = {
  address: string
  phone: string
  email: string
  openingHours?: string
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        setStatus('error')
        setErrorMessage(
          data.error ?? 'Nachricht konnte nicht gesendet werden.',
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
      <div className="mx-auto grid max-w-[1400px] gap-12 sm:gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <RevealTitle className="font-[family-name:var(--font-brand)] text-4xl tracking-[-0.03em] text-olive-950 md:text-5xl">
            Kontakt
          </RevealTitle>
          <p className="mt-4 max-w-sm font-light text-olive-800/65">
            Besuchen Sie uns in Maxglan – Parkplätze nebenan, drei Stellplätze.
          </p>
          {openingHours ? (
            <p className="mt-3 text-sm font-light text-olive-800/50">
              {openingHours}
            </p>
          ) : null}

          <div className="mt-8 space-y-1 font-light text-olive-900">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.55 }}
                className="group flex min-h-[3rem] items-center justify-between gap-4 border-b border-olive-950/10 py-3.5 transition-colors hover:text-terracotta-600 sm:py-4"
              >
                <span className="min-w-0 break-words">{link.label}</span>
                <span
                  aria-hidden
                  className="shrink-0 translate-x-0 text-terracotta-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  →
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="border border-olive-950/10 bg-white/40 p-6 sm:p-8"
        >
          <p className="font-[family-name:var(--font-brand)] text-lg tracking-tight text-olive-950 md:text-xl">
            Nachricht schreiben
          </p>
          <p className="mt-2 text-sm font-light text-olive-800/55">
            Wir melden uns so bald wie möglich bei Ihnen.
          </p>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-[10px] uppercase tracking-[0.22em] text-olive-800/50">
                Name
              </span>
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                className="w-full border border-olive-950/12 bg-sand-50/80 px-4 py-3 text-sm font-light text-olive-950 outline-none transition-colors focus:border-terracotta-500/60"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[10px] uppercase tracking-[0.22em] text-olive-800/50">
                E-Mail
              </span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className="w-full border border-olive-950/12 bg-sand-50/80 px-4 py-3 text-sm font-light text-olive-950 outline-none transition-colors focus:border-terracotta-500/60"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[10px] uppercase tracking-[0.22em] text-olive-800/50">
                Nachricht
              </span>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full resize-y border border-olive-950/12 bg-sand-50/80 px-4 py-3 text-sm font-light text-olive-950 outline-none transition-colors focus:border-terracotta-500/60"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-6 inline-flex min-h-[3rem] items-center justify-center border border-olive-950/20 px-6 py-3 text-[0.8rem] uppercase tracking-[0.18em] text-olive-950 transition-colors duration-300 hover:border-terracotta-500/50 hover:text-terracotta-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'sending' ? 'Wird gesendet …' : 'Absenden'}
          </button>

          {status === 'success' ? (
            <p className="mt-4 text-sm font-light text-olive-800/70">
              Vielen Dank – Ihre Nachricht wurde gesendet.
            </p>
          ) : null}

          {status === 'error' ? (
            <p className="mt-4 text-sm font-light text-terracotta-600">
              {errorMessage}
            </p>
          ) : null}
        </motion.form>
      </div>
    </section>
  )
}
