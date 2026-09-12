'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
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

export default function Contact({
  address,
  phone,
  email,
  openingHours,
}: ContactProps) {
  const mailtoHref = buildMailtoLink(email)

  const details = [
    {
      label: 'Adresse',
      value: address,
      href: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      external: true,
    },
    {
      label: 'Telefon',
      value: phone,
      href: `tel:${phone.replace(/\s/g, '')}`,
    },
    {
      label: 'Öffnungszeiten',
      value: openingHours ?? '',
    },
  ]

  return (
    <section
      id="contact"
      className="border-t border-olive-950/8 bg-sand-50 px-5 py-16 pb-[calc(7.5rem+env(safe-area-inset-bottom))] sm:px-8 sm:py-24 sm:pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:px-12 md:py-32 md:pb-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 max-w-lg sm:mb-12 md:mb-16">
          <RevealTitle className="font-[family-name:var(--font-brand)] text-[2rem] tracking-[-0.03em] text-olive-950 sm:text-4xl md:text-5xl">
            Kontakt
          </RevealTitle>
          <p className="mt-3 font-light leading-relaxed text-olive-800/65 sm:mt-4">
            Besuchen Sie uns in Maxglan – Parkplätze nebenan, drei Stellplätze.
          </p>
        </div>

        <div className="grid gap-6 border-y border-olive-950/10 py-7 sm:grid-cols-2 sm:gap-8 sm:py-9 md:grid-cols-3 md:gap-10 md:py-10">
          {details.map((item, i) => {
            const content = (
              <>
                <p className="text-[10px] uppercase tracking-[0.26em] text-olive-800/40">
                  {item.label}
                </p>
                <p className="mt-2 text-[0.95rem] font-light leading-relaxed text-olive-950 sm:text-base">
                  {item.value}
                </p>
              </>
            )

            if (!item.href) {
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="sm:col-span-2 md:col-span-1"
                >
                  {content}
                </motion.div>
              )
            }

            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group block transition-colors hover:text-terracotta-600"
              >
                {content}
              </motion.a>
            )
          })}
        </div>

        <div className="mt-10 grid items-start gap-8 sm:mt-12 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] md:gap-10 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-terracotta-600">
              Schreiben Sie uns
            </p>
            <a
              href={mailtoHref}
              className="group mt-3 block break-words font-[family-name:var(--font-brand)] text-[1.15rem] leading-snug tracking-tight text-olive-950 transition-colors hover:text-terracotta-600 sm:text-[1.35rem] md:text-[1.25rem] lg:text-2xl"
            >
              {email}
            </a>
            <p className="mt-3 max-w-md text-[0.95rem] font-light leading-relaxed text-olive-800/55 sm:mt-4">
              Öffnet Ihr E-Mail-Programm mit einer kurzen Vorlage – einfach
              ausfüllen und absenden.
            </p>
            <a
              href={mailtoHref}
              className="group mt-6 inline-flex min-h-12 items-center gap-2 border border-olive-950/18 px-5 py-3 text-[0.75rem] uppercase tracking-[0.2em] text-olive-950 transition-all duration-300 hover:border-terracotta-500/45 hover:text-terracotta-600 sm:mt-7 sm:px-6 sm:text-[0.78rem]"
            >
              E-Mail schreiben
              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.55 }}
            className="min-w-0"
          >
            <p
              aria-hidden
              className="hidden text-[10px] uppercase tracking-[0.28em] text-transparent md:block"
            >
              Schreiben Sie uns
            </p>
            <p className="flex max-w-sm items-start gap-3 pr-16 text-[0.95rem] font-light leading-relaxed text-olive-800/55 sm:pr-0 md:mt-3">
              <MessageCircle
                size={18}
                strokeWidth={1.4}
                className="mt-0.5 shrink-0 text-terracotta-600"
              />
              <span>
                Kurze Fragen? Unser Chat unten rechts antwortet sofort – zu
                Leistungen, Wartezeiten oder Ihrem Besuch.
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
