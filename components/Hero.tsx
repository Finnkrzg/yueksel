'use client'

import { motion } from 'framer-motion'
import { Scissors } from 'lucide-react'
import { useEffect, useState } from 'react'
import DeferredVideo from './DeferredVideo'

type HeroProps = {
  title: string
  subtitle: string
  videoUrl: string
}

export default function Hero({ title, subtitle, videoUrl }: HeroProps) {
  const shortTitle = title.replace(/^Schneiderei\s+/i, '')
  const letters = shortTitle.split('')
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (revealed) return

    const unlock = () => setRevealed(true)

    const onScroll = () => {
      if (window.scrollY > 12) unlock()
    }

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 4) unlock()
    }

    let touchY = 0
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0
    }
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0
      if (Math.abs(y - touchY) > 10) unlock()
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [revealed])

  return (
    <section
      id="top"
      className="relative h-svh min-h-[34rem] w-full overflow-hidden sm:min-h-[38rem] md:min-h-[700px]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <DeferredVideo videoUrl={videoUrl} />
      </div>

      {/* Verlauf + Atmosphäre erst nach kurzem Scroll */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1814] via-[#1a1814]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1814]/40 via-transparent to-[#1a1814]/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_100%,rgba(196,132,106,0.12),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: revealed ? 0.3 : 0 }}
        transition={{ duration: 0.7, delay: revealed ? 0.1 : 0 }}
        className="pointer-events-none absolute top-28 bottom-28 left-5 z-10 w-px md:left-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(180deg, rgba(247,243,236,0.5) 0 7px, transparent 7px 14px)',
        }}
      />
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: revealed ? 0.3 : 0 }}
        transition={{ duration: 0.7, delay: revealed ? 0.1 : 0 }}
        className="pointer-events-none absolute top-28 bottom-28 right-5 z-10 w-px md:right-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(180deg, rgba(247,243,236,0.5) 0 7px, transparent 7px 14px)',
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-[calc(4.5rem+env(safe-area-inset-bottom))] pt-24 sm:pb-16 md:px-14 md:pb-20 md:pt-28 lg:px-20">
        <motion.div
          initial={false}
          animate={{
            opacity: revealed ? 1 : 0,
            y: revealed ? 0 : 28,
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[1400px]"
          style={{ pointerEvents: revealed ? 'auto' : 'none' }}
        >
          <motion.div
            initial={false}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 12 }}
            transition={{ duration: 0.7, delay: revealed ? 0.05 : 0 }}
            className="mb-4 text-[#e8d5c4] md:mb-6"
          >
            <Scissors className="rotate-[-18deg]" size={16} strokeWidth={1.2} />
          </motion.div>

          <h1 
            className="font-[family-name:var(--font-brand)] text-[clamp(2.9rem,13vw,4.5rem)] leading-[0.9] tracking-[-0.03em] text-[#f7f1e8] [text-shadow:0_2px_40px_rgba(26,24,20,0.35)] md:text-[clamp(4rem,10vw,8.5rem)] md:leading-[0.88]"
            aria-label={shortTitle}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                aria-hidden="true"
                initial={false}
                animate={{
                  opacity: revealed ? 1 : 0,
                  y: revealed ? 0 : 36,
                }}
                transition={{
                  duration: 0.55,
                  delay: revealed ? 0.08 + i * 0.028 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
                style={{ whiteSpace: letter === ' ' ? 'pre' : undefined }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={false}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 14 }}
            transition={{
              duration: 0.7,
              delay: revealed ? 0.35 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 max-w-md text-[0.95rem] font-light leading-relaxed text-[#e8e0d4]/90 md:mt-6 md:text-lg"
          >
            {subtitle}
          </motion.p>

          <motion.p
            initial={false}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ duration: 0.6, delay: revealed ? 0.5 : 0 }}
            className="mt-6 text-[10px] uppercase tracking-[0.28em] text-[#d4b8a0]/70 md:mt-8 md:text-[11px] md:tracking-[0.32em]"
          >
            Maxglan · Salzburg
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll-Hinweis nur solange Text noch verborgen */}
      <motion.div
        initial={false}
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-8"
        style={{ pointerEvents: revealed ? 'none' : 'auto' }}
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-[#e8e0d4]/55">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0], opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-px bg-gradient-to-b from-[#e8d5c4] to-transparent"
        />
      </motion.div>
    </section>
  )
}
