import dynamic from 'next/dynamic'
import ClientChrome from '@/components/ClientChrome'
import Hero from '@/components/Hero'
import MarqueeBand from '@/components/MarqueeBand'
import Navbar from '@/components/Navbar'
import Services from '@/components/Services'
import { fallbackHomepage } from '@/lib/fallback'
import { mergeHomepage } from '@/lib/merge-homepage'
import { homepageQuery } from '@/lib/queries'
import type { HomepageData } from '@/lib/types'
import { client } from '@/sanity/lib/client'

export const revalidate = 300

const UspSection = dynamic(() => import('@/components/UspSection'))
const Faq = dynamic(() => import('@/components/Faq'))
const Contact = dynamic(() => import('@/components/Contact'))

async function getHomepage(): Promise<HomepageData> {
  try {
    const data = await client.fetch<Partial<HomepageData> | null>(homepageQuery)
    return mergeHomepage(data)
  } catch {
    return fallbackHomepage
  }
}

export default async function Home() {
  const page = await getHomepage()

  return (
    <>
      <ClientChrome />
      <Navbar brand={page.hero.title} />
      <main>
        <Hero
          title={page.hero.title}
          subtitle={page.hero.subtitle}
          videoUrl={page.hero.videoUrl}
        />
        <MarqueeBand />
        <UspSection
          title={page.usp.title}
          text={page.usp.text}
          mainImageUrl={page.usp.mainImageUrl!}
          detailImageUrl={page.usp.detailImageUrl!}
          galleryUrls={page.usp.galleryUrls}
        />
        <Services services={page.services} />
        <Faq items={page.faq} />
        <Contact
          address={page.contact.address}
          phone={page.contact.phone}
          email={page.contact.email}
          openingHours={page.contact.openingHours}
        />
      </main>
      <footer className="border-t border-olive-950/10 px-6 py-7 pb-[calc(1.75rem+env(safe-area-inset-bottom))] md:px-12 md:py-8">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 text-[0.8rem] font-light text-olive-800/45 sm:flex-row sm:text-sm">
          <div className="flex items-center gap-6">
            <span className="font-[family-name:var(--font-brand)] text-olive-950/60">
              Yüksel
            </span>
            <span className="hidden sm:inline">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/impressum" className="hover:text-olive-950 transition-colors">Impressum</a>
            <a href="/datenschutz" className="hover:text-olive-950 transition-colors">Datenschutz</a>
          </div>
          <span className="sm:hidden">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  )
}
