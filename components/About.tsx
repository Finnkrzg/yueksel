'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { PersonBlock } from '@/lib/types'
import RevealTitle from './RevealTitle'

type AboutProps = {
  talha: PersonBlock
  senior: PersonBlock
}

function Person({
  name,
  person,
  offset = false,
}: {
  name: string
  person: PersonBlock
  offset?: boolean
}) {
  if (!person.imageUrl) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${offset ? 'md:mt-20' : ''}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#c9b89a]">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={person.imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 40vw"
            quality={70}
            loading="lazy"
          />
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-olive-950/80 via-olive-950/35 to-transparent p-5 pt-24 sm:p-6 sm:pt-28">
          <h3 className="font-[family-name:var(--font-brand)] text-2xl text-sand-50 sm:text-3xl">
            {name}
          </h3>
          {person.description && (
            <p className="mt-2 max-w-sm text-[0.82rem] font-light leading-relaxed text-sand-100/80 sm:text-sm">
              {person.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function About({ talha, senior }: AboutProps) {
  return (
    <section
      id="about"
      className="relative bg-sand-50 px-6 py-20 sm:py-28 md:px-12 md:py-36"
    >
      <div className="relative mx-auto max-w-[1400px] space-y-14 sm:space-y-20 md:space-y-28">
        <div className="max-w-xl">
          <RevealTitle className="font-[family-name:var(--font-brand)] text-4xl tracking-[-0.03em] text-olive-950 md:text-5xl">
            Familie
          </RevealTitle>
          <p className="mt-4 font-light leading-relaxed text-olive-800/70">
            Zwei Generationen. Ein Atelier. Handwerk, das bleibt – und sich weiterentwickelt.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
          <Person name="Talha" person={talha} />
          <Person name="Senior" person={senior} offset />
        </div>
      </div>
    </section>
  )
}
