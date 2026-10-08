import ComingSoon from '@/components/ComingSoon'
import { fallbackHomepage } from '@/lib/fallback'
import { mergeHomepage } from '@/lib/merge-homepage'
import { homepageQuery } from '@/lib/queries'
import type { HomepageData } from '@/lib/types'
import { client } from '@/sanity/lib/client'

export const revalidate = 300

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
    <ComingSoon
      address={page.contact.address}
      phone={page.contact.phone}
      email={page.contact.email}
      openingHours={page.contact.openingHours}
    />
  )
}
