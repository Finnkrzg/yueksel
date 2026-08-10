'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Linker Scroll-Faden.
 * Liegt bewusst exakt auf derselben x-Achse wie die gestrichelte Hero-Linie
 * (left-5 / md:left-10), damit beides als ein Element gelesen wird statt als
 * zwei knapp versetzte Linien. Der Punkt blendet erst nach dem Hero ein.
 */
export default function ScrollThread() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  })
  const top = useTransform(progress, [0, 1], ['0%', '100%'])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.55)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed top-[12vh] bottom-[12vh] left-5 z-[60] hidden w-px md:left-10 md:block"
    >
      {/* Gleicher Strich-Rhythmus wie im Hero */}
      <div
        className="absolute inset-y-0 left-0 w-px opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(180deg, var(--olive-950) 0 7px, transparent 7px 14px)',
        }}
      />
      <motion.div
        className="absolute top-0 left-0 w-px origin-top bg-terracotta-600"
        style={{ scaleY: progress, height: '100%' }}
      />
      <motion.div
        className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-terracotta-600 bg-sand-50"
        style={{ top }}
      />
    </motion.div>
  )
}
