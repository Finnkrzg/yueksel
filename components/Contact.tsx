'use client'

import { motion } from 'framer-motion'
import RevealTitle from './RevealTitle'

type ContactProps = {
  address: string
  phone: string
  email: string
  openingHours?: string
}

export default function Contact({
  address,
  phone,
  email,
  openingHours,
}: ContactProps) {
  const links = [
    {
      label: address,
      href: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      external: true,
    },
    { label: phone, href: `tel:${phone.replace(/\s/g, '')}` },
    { label: email, href: `mailto:${email}` },
  ]

  return (
    <section
      id="contact"
      className="border-t border-olive-950/8 bg-sand-50 px-6 py-20 pb-[calc(5rem+env(safe-area-inset-bottom))] sm:py-28 md:px-12 md:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] gap-10 sm:gap-14 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div>
          <RevealTitle className="font-[family-name:var(--font-brand)] text-4xl tracking-[-0.03em] text-olive-950 md:text-5xl">
            Kontakt
          </RevealTitle>
          <p className="mt-4 max-w-sm font-light text-olive-800/65">
            Besuchen Sie uns in Maxglan – Parkplätze direkt vor der Tür.
          </p>
          {openingHours ? (
            <p className="mt-3 text-sm font-light text-olive-800/50">
              {openingHours}
            </p>
          ) : null}
        </div>

        <div className="space-y-1 font-light text-olive-900">
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
    </section>
  )
}
