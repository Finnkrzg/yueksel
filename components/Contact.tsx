'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import RevealTitle from './RevealTitle'

type ContactProps = {
  address: string
  phone: string
  email: string
  openingHours?: string
}

function buildMailtoLink(email: string) {
  const subject = encodeURIComponent('Anfrage – Schneiderei Yüksel')
  const body = encodeURIComponent(
    'Guten Tag,\n\nich habe eine Anfrage an die Schneiderei Yüksel:\n\n[Beschreibung Ihres Anliegens – z. B. Art der Änderung, Stoff, gewünschter Termin]\n\nMit freundlichen Grüßen\n[Ihr Name]\n[Telefonnummer, optional]',
  )
  return `mailto:${email}?subject=${subject}&body=${body}`
}

const mailHints = [
  'Art der Änderung oder des Anliegens',
  'Gewünschter Termin oder Zeitrahmen',
  'Telefonnummer für Rückfragen',
]

export default function Contact({
  address,
  phone,
  email,
  openingHours,
}: ContactProps) {
  const mailtoHref = buildMailtoLink(email)
  const telHref = `tel:${phone.replace(/\s/g, '')}`

  const visitLinks = [
    {
      label: address,
      href: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      external: true,
    },
  ]

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
            Oder schreiben Sie uns eine E-Mail – wir melden uns so bald wie möglich.
          </p>
        </div>

        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 xl:gap-28">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-terracotta-600">
              Vor Ort
            </p>

            <div className="mt-5 divide-y divide-olive-950/10 border-y border-olive-950/10 font-light text-olive-900">
              {visitLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
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

              <motion.a
                href={telHref}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.16, duration: 0.55 }}
                className="group flex min-h-[3.5rem] items-center justify-between gap-4 py-4 transition-colors hover:text-terracotta-600 sm:py-5"
              >
                <span className="flex items-center gap-3">
                  <Phone size={15} strokeWidth={1.5} className="shrink-0 text-olive-800/40" />
                  {phone}
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="shrink-0 text-terracotta-600 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </motion.a>
            </div>

            {openingHours ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.55 }}
                className="mt-6 text-sm font-light text-olive-800/50"
              >
                {openingHours}
              </motion.p>
            ) : null}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="border-l border-olive-950/10 pl-0 lg:pl-12 xl:pl-16"
          >
            <p className="text-[10px] uppercase tracking-[0.32em] text-terracotta-600">
              Per E-Mail
            </p>

            <p className="mt-4 max-w-lg font-light leading-relaxed text-olive-800/65">
              Schreiben Sie uns gerne – ob Änderung, Reparatur, Reinigung oder eine
              allgemeine Frage. Eine kurze Beschreibung reicht, den Rest klären wir
              persönlich.
            </p>

            <ul className="mt-6 space-y-2.5">
              {mailHints.map((hint, i) => (
                <li
                  key={hint}
                  className="flex items-start gap-3 text-sm font-light text-olive-800/55"
                >
                  <span className="mt-[0.45rem] h-px w-4 shrink-0 bg-terracotta-500/50" />
                  {hint}
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-olive-950/10 pt-8">
              <a
                href={mailtoHref}
                className="group block transition-colors hover:text-terracotta-600"
              >
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-olive-800/45 transition-colors group-hover:text-terracotta-600/70">
                  <Mail size={14} strokeWidth={1.5} />
                  E-Mail-Adresse
                </span>
                <span className="mt-2 block break-all font-[family-name:var(--font-brand)] text-xl tracking-tight text-olive-950 sm:text-2xl md:text-[1.65rem]">
                  {email}
                </span>
              </a>

              <a
                href={mailtoHref}
                className="group mt-8 inline-flex min-h-[3rem] items-center justify-center gap-2 border border-olive-950/18 px-7 py-3 text-[0.78rem] uppercase tracking-[0.2em] text-olive-950 transition-all duration-300 hover:border-terracotta-500/45 hover:bg-terracotta-500/[0.04] hover:text-terracotta-600"
              >
                E-Mail schreiben
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <p className="mt-5 max-w-sm text-[0.85rem] font-light leading-relaxed text-olive-800/45">
                Beim Klick öffnet sich Ihr E-Mail-Programm mit einer Vorlage –
                einfach ausfüllen und absenden.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
