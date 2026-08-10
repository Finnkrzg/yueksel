'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Prüfen, ob der User bereits eine Entscheidung getroffen hat
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Kurze Verzögerung, damit es nicht zu aggressiv beim Laden wirkt
      const timer = setTimeout(() => setShow(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    // Hier würde man Google Analytics initialisieren
    // window.gtag('consent', 'update', { analytics_storage: 'granted' })
    setShow(false)
  }

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential')
    // Hier würde man Google Analytics blockieren/nicht laden
    // window.gtag('consent', 'update', { analytics_storage: 'denied' })
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 md:p-8"
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-6 rounded-2xl bg-olive-950 p-6 text-sand-50 shadow-2xl md:flex-row md:items-center md:p-8">
            <div className="flex-1">
              <h3 className="font-[family-name:var(--font-brand)] text-xl text-sand-50">
                Wir verwenden Cookies
              </h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-sand-100/70">
                Um unsere Webseite für Sie optimal zu gestalten und fortlaufend verbessern zu können, verwenden wir Cookies. Neben technisch notwendigen Cookies nutzen wir auch Google Analytics, um anonymisierte Statistiken zu erheben.
                <br className="hidden sm:block" />
                Weitere Informationen finden Sie in unserer{' '}
                <Link href="/datenschutz" className="text-terracotta-400 hover:text-terracotta-300 underline underline-offset-4 transition-colors">
                  Datenschutzerklärung
                </Link>.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <button
                onClick={acceptEssential}
                className="rounded-full border border-sand-50/20 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-sand-50/10"
              >
                Nur notwendige
              </button>
              <button
                onClick={acceptAll}
                className="rounded-full bg-terracotta-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-terracotta-500"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
