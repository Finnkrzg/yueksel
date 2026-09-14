'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const ringPos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const hovering = useRef(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    let frame = 0
    let started = false

    const applyHover = (next: boolean) => {
      if (hovering.current === next) return
      hovering.current = next
      const size = next ? '3rem' : '2rem'
      const dot = next ? '0.625rem' : '0.375rem'
      if (dotRef.current) {
        dotRef.current.style.width = dot
        dotRef.current.style.height = dot
      }
      if (ringRef.current) {
        ringRef.current.style.width = size
        ringRef.current.style.height = size
        ringRef.current.style.opacity = next ? '1' : '0.7'
      }
    }

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.opacity = '1'
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) ringRef.current.style.opacity = hovering.current ? '1' : '0.7'
      if (!started) {
        ringPos.current = { x: e.clientX, y: e.clientY }
        started = true
      }
    }

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null
      if (!el) return
      applyHover(
        Boolean(
          el.closest('a, button, [role="button"], label, summary, input, textarea'),
        ),
      )
    }

    const tick = () => {
      const dx = target.current.x - ringPos.current.x
      const dy = target.current.y - ringPos.current.y
      ringPos.current.x += dx * 0.45
      ringPos.current.y += dy * 0.45

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`
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
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[999] mix-blend-difference">
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-white opacity-0 will-change-transform"
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 h-8 w-8 rounded-full border border-white opacity-0 will-change-transform"
        style={{ transition: 'width 0.2s ease-out, height 0.2s ease-out, opacity 0.2s ease-out' }}
      />
    </div>
  )
}
