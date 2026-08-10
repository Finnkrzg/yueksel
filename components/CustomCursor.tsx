'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    let frame = 0

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      setVisible(true)
    }

    const onLeave = () => setVisible(false)

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null
      if (!el) return
      const interactive = el.closest('a, button, [role="button"], label, summary, input, textarea')
      setHovering(Boolean(interactive))
    }

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.22
      pos.current.y += (target.current.y - pos.current.y) * 0.22

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`
      }

      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[999] mix-blend-difference transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 rounded-full bg-white transition-[width,height] duration-200 ease-out ${
          hovering ? 'h-2.5 w-2.5' : 'h-1.5 w-1.5'
        }`}
      />
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 rounded-full border border-white transition-[width,height,opacity] duration-300 ease-out ${
          hovering ? 'h-12 w-12 opacity-100' : 'h-8 w-8 opacity-70'
        }`}
      />
    </div>
  )
}
