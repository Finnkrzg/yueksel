'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Logo from './Logo'

const links = [
  { href: '#usp', label: 'Atelier', index: '01' },
  { href: '#services', label: 'Handwerk', index: '02' },
  { href: '#about', label: 'Familie', index: '03' },
  { href: '#faq', label: 'Fragen', index: '04' },
  { href: '#contact', label: 'Besuch', index: '05' },
]

type NavbarProps = {
  brand?: string
}

export default function Navbar({ brand = 'Schneiderei Yüksel' }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Obere Naht */}
        <div
          aria-hidden
          className={`h-px transition-opacity duration-500 ${
            scrolled || open ? 'opacity-100' : 'opacity-40'
          }`}
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, currentColor 0 5px, transparent 5px 11px)',
            color: scrolled || open ? 'rgba(44,48,36,0.2)' : 'rgba(247,243,236,0.35)',
          }}
        />

        <div
          className={`transition-all duration-500 ${
            scrolled || open
              ? 'bg-sand-50/90 backdrop-blur-md'
              : 'bg-transparent'
          }`}
        >
          {/*
            Mobil ist die linke Meta-Spalte ausgeblendet und damit kein Grid-Item mehr.
            Darum braucht Mobile ein eigenes 2-Spalten-Raster, sonst landet der
            Menü-Button in einer mittleren Spalte statt am rechten Rand.
          */}
          <nav className="relative mx-auto grid max-w-[1400px] grid-cols-[auto_1fr] items-center px-4 py-3 sm:px-5 sm:py-4 md:grid-cols-[1fr_auto_1fr] md:px-10 md:py-5">
            {/* Links: Jahr + Ort */}
            <div
              className={`hidden items-center gap-5 text-[10px] uppercase tracking-[0.28em] md:flex ${
                scrolled || open ? 'text-olive-800/70' : 'text-sand-50/75'
              }`}
            >
              <span>Seit 1990</span>
              <span aria-hidden className="hidden h-3 w-px bg-current opacity-40 xl:block" />
              <span className="hidden xl:inline">Maxglan · Salzburg</span>
            </div>

            {/* Mitte: Offizielles Logo */}
            <a
              href="#top"
              className="min-w-0 justify-self-start md:justify-self-center"
              onClick={() => setOpen(false)}
              aria-label={brand}
            >
              <Logo
                className={
                  scrolled || open ? 'text-olive-950' : 'text-sand-50'
                }
              />
            </a>

            {/* Rechts: Navigation + Menü */}
            <div className="justify-self-end">
              <div className="hidden items-center gap-6 lg:flex xl:gap-8">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`group relative text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                      scrolled || open
                        ? 'text-olive-900/60 hover:text-olive-950'
                        : 'text-sand-50/70 hover:text-sand-50'
                    }`}
                  >
                    {link.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-terracotta-500 transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>

              <button
                type="button"
                aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
                aria-expanded={open}
                className={`relative flex h-11 w-11 items-center justify-center lg:hidden ${
                  scrolled || open ? 'text-olive-950' : 'text-sand-50'
                }`}
                onClick={() => setOpen((value) => !value)}
              >
                <span className="sr-only">Menü</span>
                <span className="flex w-5 flex-col gap-[5px]">
                  <span
                    className={`h-px w-full origin-center bg-current transition-transform duration-300 ${
                      open ? 'translate-y-[6px] rotate-45' : ''
                    }`}
                  />
                  <span
                    className={`h-px w-full bg-current transition-opacity duration-300 ${
                      open ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`h-px w-full origin-center bg-current transition-transform duration-300 ${
                      open ? '-translate-y-[6px] -rotate-45' : ''
                    }`}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Fullscreen Menü – atelierartig */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-sand-50"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 20%, rgba(181,106,76,0.12), transparent 40%), radial-gradient(circle at 80% 70%, rgba(44,48,36,0.08), transparent 45%)',
              }}
            />

            <div className="flex h-full flex-col justify-between gap-10 overflow-y-auto overscroll-contain px-6 pt-24 pb-[calc(2.5rem+env(safe-area-inset-bottom))] md:px-12 md:pt-28">
              <nav className="space-y-1">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.45 }}
                    onClick={() => setOpen(false)}
                    className="group flex items-end gap-4 border-b border-olive-900/10 py-4 sm:gap-5 sm:py-5"
                  >
                    <span className="font-[family-name:var(--font-brand)] text-xs text-terracotta-600 sm:text-sm">
                      {link.index}
                    </span>
                    <span className="font-[family-name:var(--font-brand)] text-[2rem] leading-none tracking-tight text-olive-950 transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl md:text-6xl">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="shrink-0 text-[10px] uppercase tracking-[0.22em] text-olive-800/55 sm:text-[11px] sm:tracking-[0.3em]"
              >
                Maxglaner Hauptstraße 64 · 5020 Salzburg
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
