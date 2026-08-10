import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/'], // Sanity Studio vom Crawling ausschließen
    },
    sitemap: 'https://schneiderei-yueksel.at/sitemap.xml', // Bitte an echte Domain anpassen
  }
}
