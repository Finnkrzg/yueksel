'use client'

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Bell, Check } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import RevealTitle from './RevealTitle'
import YearTicker from './YearTicker'

type UspSectionProps = {
  title: string
  text: string
  mainImageUrl: string
  detailImageUrl: string
  galleryUrls: string[]
}

const statusSteps = ['Angenommen', 'In Arbeit', 'Abholbereit']

const notes = [
  'Erste digitale Kundenbetreuung Österreichs',
  'Status und Abholbereit am Handy',
  'Handwerk seit 1990',
]

export default function UspSection({
  title,
  text,
  mainImageUrl,
  detailImageUrl,
  galleryUrls,
}: UspSectionProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [48, -48])
  const phoneY = useTransform(scrollYProgress, [0, 1], [-28, 36])
  const detailY = useTransform(scrollYProgress, [0, 1], [20, -30])
  const galleryX = useTransform(scrollYProgress, [0, 1], [40, -80])

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveStep((step) => (step + 1) % statusSteps.length)
    }, 2600)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const apply = () => setIsDesktop(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="usp"
      className="relative overflow-x-hidden bg-sand-50 px-6 py-20 sm:py-28 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-12 sm:gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-24">
          <div className="max-w-xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-terracotta-600">
              Premiere in Österreich
            </p>
            {/* Lange Einzelwörter wie „Kundenbetreuung.“ dürfen auf 320px nicht überlaufen */}
            <RevealTitle className="font-[family-name:var(--font-brand)] text-[1.85rem] leading-[1.08] tracking-[-0.03em] text-olive-950 sm:text-4xl sm:leading-[1.05] md:text-5xl">
              {title}
            </RevealTitle>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 text-[1.02rem] font-light leading-relaxed text-olive-800/75 sm:mt-6 sm:text-lg"
            >
              {text}
            </motion.p>

            <ul className="mt-10 space-y-3.5 border-t border-olive-950/10 pt-8">
              {notes.map((note, i) => (
                <motion.li
                  key={note}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-3 text-sm font-light text-olive-800/70"
                >
                  <span className="h-px w-4 shrink-0 bg-terracotta-600/70" />
                  {note}
                </motion.li>
              ))}
            </ul>

            <div className="mt-12">
              <YearTicker />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]"
            >
              <motion.div
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0 0 0)' }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={mainImageUrl}
                  alt="Arbeit am Stoff im Atelier"
                  fill
                  className="object-cover scale-105"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  quality={70}
                  loading="lazy"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-olive-950/35 via-transparent to-olive-950/10" />
            </motion.div>

            <motion.div
              style={{ y: detailY }}
              className="absolute -bottom-6 -left-2 z-10 hidden w-36 overflow-hidden shadow-[0_20px_40px_rgba(35,38,28,0.2)] sm:block md:-left-8 md:w-44 lg:-bottom-8"
            >
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0 0 0)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[3/4]"
              >
                <Image
                  src={detailImageUrl}
                  alt="Detail Stoff und Nadel"
                  fill
                  className="object-cover"
                  sizes="180px"
                  quality={65}
                  loading="lazy"
                />
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: phoneY }}
              className="absolute -right-1 bottom-4 z-20 w-[168px] sm:right-4 sm:bottom-8 sm:w-[220px] md:-right-4 md:bottom-10 md:w-[240px] lg:right-0"
            >
              <div className="rounded-[1.5rem] bg-olive-950 p-1.5 shadow-[0_28px_50px_rgba(35,38,28,0.35)] sm:rounded-[2rem] sm:p-2">
                <div className="flex min-h-[330px] flex-col overflow-hidden rounded-[1.2rem] bg-sand-50 sm:min-h-[420px] sm:rounded-[1.6rem] md:min-h-[460px]">
                  <div className="flex justify-center pt-2 pb-1 sm:pt-2.5">
                    <span className="h-2.5 w-11 rounded-full bg-olive-950/90 sm:h-3 sm:w-14" />
                  </div>

                  <div className="flex flex-1 flex-col px-3 pt-3 pb-3 sm:px-4 sm:pt-4 sm:pb-4">
                    <p className="text-[8px] uppercase tracking-[0.24em] text-olive-800/45 sm:text-[9px] sm:tracking-[0.28em]">
                      Ihr Auftrag
                    </p>
                    <h3 className="mt-1.5 font-[family-name:var(--font-brand)] text-base text-olive-950 sm:text-lg">
                      Sakko · Änderung
                    </h3>

                    <div className="mt-6 flex-1 sm:mt-8">
                      {statusSteps.map((label, i) => {
                        const done = i < activeStep
                        const active = i === activeStep

                        return (
                          <div key={label} className="flex gap-2.5">
                            <div className="flex flex-col items-center">
                              <motion.span
                                animate={{
                                  scale: active ? 1.06 : 1,
                                  backgroundColor: active
                                    ? 'rgba(168, 95, 66, 1)'
                                    : done
                                      ? 'rgba(35, 38, 28, 1)'
                                      : 'rgba(247, 243, 236, 1)',
                                }}
                                transition={{ duration: 0.35 }}
                                className={`flex h-5 w-5 items-center justify-center rounded-full border text-[8px] sm:h-6 sm:w-6 sm:text-[9px] ${
                                  active || done
                                    ? 'border-transparent text-sand-50'
                                    : 'border-olive-950/15 text-olive-800/35'
                                }`}
                              >
                                {done ? <Check size={11} strokeWidth={2} /> : i + 1}
                              </motion.span>
                              {i < statusSteps.length - 1 && (
                                <span
                                  className={`my-0.5 w-px min-h-5 flex-1 sm:min-h-6 ${
                                    i < activeStep
                                      ? 'bg-olive-950/25'
                                      : 'bg-olive-950/8'
                                  }`}
                                />
                              )}
                            </div>
                            <p
                              className={`pb-4 font-[family-name:var(--font-brand)] text-[0.8rem] transition-colors duration-300 sm:pb-5 sm:text-sm ${
                                active
                                  ? 'text-terracotta-600'
                                  : done
                                    ? 'text-olive-950'
                                    : 'text-olive-800/30'
                              }`}
                            >
                              {label}
                            </p>
                          </div>
                        )
                      })}
                    </div>

                    <AnimatePresence mode="wait">
                      {activeStep === 2 ? (
                        <motion.div
                          key="ready"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 rounded-lg bg-terracotta-600 px-3 py-2.5 text-sand-50"
                        >
                          <Bell size={13} strokeWidth={1.5} />
                          <p className="text-[11px] font-light">Abholbereit</p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="wait"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 rounded-lg bg-olive-100/70 px-3 py-2.5"
                        >
                          <Bell
                            size={13}
                            strokeWidth={1.5}
                            className="text-olive-800/40"
                          />
                          <p className="text-[11px] font-light text-olive-800/55">
                            Wir benachrichtigen Sie
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/*
          Mobil echtes Swipen mit Snap – der 140%-Parallax-Track würde auf
          kleinen Displays die hinteren Bilder unerreichbar abschneiden.
        */}
        <div className="-mx-6 mt-20 snap-x snap-mandatory overflow-x-auto overscroll-x-contain px-6 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:mt-32 md:snap-none md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
        <motion.div
          style={isDesktop ? { x: galleryX } : undefined}
          className="flex gap-3 md:w-[140%] md:gap-4"
        >
          {galleryUrls.map((src, i) => {
            // AEO: Bessere Alt-Texte für die Galerie
            const altTexts = [
              'Einblick in unsere Werkstatt',
              'Präzises Zuschneiden von Stoffen',
              'Unser Empfangsbereich in Salzburg',
              'Atmosphärisches Detail unserer Schneiderei'
            ]
            const altText = altTexts[i] || 'Impressionen aus der Schneiderei Yüksel'

            return (
              <motion.div
                key={`${src}-${i}`}
                initial={{ clipPath: 'inset(12% 12% 12% 12%)', opacity: 0.6 }}
                whileInView={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative min-w-[80%] shrink-0 snap-start overflow-hidden sm:min-w-[55%] md:min-w-[32%] ${
                  i === 1 ? 'aspect-[4/3] md:mt-10' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={src}
                  alt={altText}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                  sizes="(max-width: 768px) 80vw, 33vw"
                  quality={65}
                  loading="lazy"
                />
              </motion.div>
            )
          })}
        </motion.div>
        </div>
      </div>
    </section>
  )
}
