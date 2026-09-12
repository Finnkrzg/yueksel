'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import RevealTitle from './RevealTitle'

/** Test-E-Mail – vor Go-Live wieder auf Schneiderei.yueksel@gmail.com setzen */
const FORM_EMAIL = 'finnkrue@icloud.com'
const SITE_URL = 'https://schneiderei-yueksel.at'

type ContactProps = {
  address: string
  phone: string
  email: string
  openingHours?: string
}

type FormStatus = 'idle' | 'sending' | 'success'

const inputClass =
  'w-full border-0 border-b border-olive-950/12 bg-transparent px-0 py-3 text-[0.95rem] font-light text-olive-950 placeholder:text-olive-800/30 outline-none transition-colors focus:border-terracotta-500/70'

export default function Contact({
  address,
  phone,
  email,
  openingHours,
}: ContactProps) {
  const [status, setStatus] = useState<FormStatus>('idle')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('contact') !== 'sent') return

    setStatus('success')

    const url = new URL(window.location.href)
    url.searchParams.delete('contact')
    window.history.replaceState({}, '', `${url.pathname}#contact`)
  }, [])

  const links = [
    {
      label: address,
      href: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      external: true,
    },
    { label: phone, href: `tel:${phone.replace(/\s/g, '')}` },
    { label: email, href: `mailto:${email}` },
  ]

  function handleSubmit(_event: FormEvent<HTMLFormElement>) {
    setStatus('sending')
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

            <form
              action={`https://formsubmit.co/${encodeURIComponent(FORM_EMAIL)}`}
              method="POST"
              onSubmit={handleSubmit}
              className="mt-8"
            >
              <input type="hidden" name="_subject" value="Anfrage – Schneiderei Yüksel" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input
                type="hidden"
                name="_next"
                value={`${SITE_URL}/?contact=sent#contact`}
              />
              {/* Honeypot gegen Spam */}
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

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
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
