'use client'

import { motion } from 'framer-motion'
import type { ServiceItem } from '@/lib/types'
import RevealTitle from './RevealTitle'

type ServicesProps = {
  services: ServiceItem[]
}

export default function Services({ services }: ServicesProps) {
  // AEO: JSON-LD Schema für Services
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Schneiderei Yüksel',
        },
      },
    })),
  }

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-olive-950 px-6 py-20 text-sand-50 sm:py-28 md:px-12 md:py-36"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* Driftendes Hintergrundwort */}
      <motion.p
        aria-hidden
        initial={{ x: '8%' }}
        whileInView={{ x: '-6%' }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute top-16 left-0 whitespace-nowrap font-[family-name:var(--font-brand)] text-[18vw] leading-none text-sand-50/[0.03]"
      >
        Handwerk
      </motion.p>

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-12 max-w-lg sm:mb-16">
          <RevealTitle className="font-[family-name:var(--font-brand)] text-4xl tracking-[-0.03em] md:text-5xl">
            Services
          </RevealTitle>
          <p className="mt-4 font-light text-sand-100/55">
            Zusätzlich zur Maßarbeit – ruhig, präzise und zuverlässig.
          </p>
        </div>

        <div className="divide-y divide-sand-50/10 border-y border-sand-50/10">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ x: 8 }}
              className="group grid gap-2 py-7 sm:gap-3 sm:py-9 md:grid-cols-[4rem_1fr_1.4fr] md:items-baseline md:gap-10 md:py-11"
            >
              <span className="font-[family-name:var(--font-brand)] text-base text-terracotta-300/50 transition-colors duration-300 group-hover:text-terracotta-300 sm:text-xl">
                0{index + 1}
              </span>
              <h3 className="font-[family-name:var(--font-brand)] text-lg tracking-tight sm:text-xl md:text-2xl">
                {service.title}
              </h3>
              <p className="max-w-md text-[0.95rem] font-light text-sand-100/55 transition-colors duration-300 group-hover:text-sand-100/80 md:text-base">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
