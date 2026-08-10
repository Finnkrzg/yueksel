'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import type { FaqItem } from '@/lib/types'
import RevealTitle from './RevealTitle'

type FaqProps = {
  items: FaqItem[]
}

export default function Faq({ items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  if (!items.length) return null

  return (
    <section id="faq" className="bg-sand-50 px-6 py-20 sm:py-28 md:px-12 md:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 max-w-xl sm:mb-14 md:mb-20">
          <RevealTitle className="font-[family-name:var(--font-brand)] text-4xl tracking-[-0.03em] text-olive-950 md:text-5xl">
            Häufige Fragen
          </RevealTitle>
          <p className="mt-4 font-light text-olive-800/65">
            Kurz und klar – die wichtigsten Antworten auf einen Blick.
          </p>
        </div>

        <div className="mx-auto max-w-3xl divide-y divide-olive-950/10 border-y border-olive-950/10">
          {items.map((item, index) => {
            const open = openIndex === index

            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left sm:gap-6 sm:py-6"
                  aria-expanded={open}
                >
                  <span className="font-[family-name:var(--font-brand)] text-[1.05rem] leading-snug tracking-tight text-olive-950 sm:text-xl md:text-2xl">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-0.5 shrink-0 text-terracotta-600 sm:mt-1"
                  >
                    <Plus size={20} strokeWidth={1.5} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-[0.95rem] font-light leading-relaxed text-olive-800/75 sm:pb-7 sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
