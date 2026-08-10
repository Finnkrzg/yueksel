'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/** Zählt die Jahre seit 1990 – kleines „coded“ Detail */
export default function YearTicker() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const target = new Date().getFullYear() - 1990
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const duration = 1500

    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-baseline gap-3 font-[family-name:var(--font-brand)]"
    >
      <span className="text-5xl tracking-tight text-olive-950 tabular-nums md:text-6xl">
        {count}
        <span className="text-terracotta-600">+</span>
      </span>
      <span className="text-xs uppercase tracking-[0.28em] text-olive-800/50">
        Jahre
        <br />
        Handwerk
      </span>
    </motion.div>
  )
}
