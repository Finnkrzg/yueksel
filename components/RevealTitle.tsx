'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type RevealTitleProps = {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

/** Wort-für-Wort Reveal – fühlt sich handgebaut an */
export default function RevealTitle({
  children,
  className = '',
  as = 'h2',
}: RevealTitleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const Tag = as
  const words = children.split(' ')

  return (
    <div ref={ref}>
      <Tag className={className}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden pb-[0.08em] align-bottom"
          >
            <motion.span
              className="inline-block"
              initial={{ y: '110%', rotate: 4 }}
              animate={inView ? { y: '0%', rotate: 0 } : undefined}
              transition={{
                duration: 0.7,
                delay: 0.05 + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  )
}
