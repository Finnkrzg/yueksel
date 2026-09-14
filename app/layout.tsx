import type { Metadata, Viewport } from 'next'
import { Manrope, Syne } from 'next/font/google'
import CookieBanner from '@/components/CookieBanner'
import './globals.css'

const brand = Syne({
  variable: '--font-brand',
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  preload: true,
})

const body = Manrope({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://schneiderei-yueksel.at'), // Bitte an echte Domain anpassen falls abweichend
  title: {
    default: 'Schneiderei Yüksel · Maßarbeit & Änderungsschneiderei in Salzburg',
    template: '%s | Schneiderei Yüksel Salzburg',
  },
  description:
    'Schneiderei Yüksel in Salzburg – erste Schneiderei Österreichs mit digitaler Kundenbetreuung. Status am Handy, Handwerk seit 1990. Maxglaner Hauptstraße 64.',
  keywords: [
    'Schneiderei Salzburg',
    'Änderungsschneiderei',
    'Maßschneiderei',
    'Vorhangservice',
    'Teppichreinigung',
    'Textilreinigung',
    'Maxglan',
    'Yüksel',
    'digitale Kundenbetreuung',
  ],
  authors: [{ name: 'Schneiderei Yüksel' }],
  creator: 'Schneiderei Yüksel',
  publisher: 'Schneiderei Yüksel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Schneiderei Yüksel · Maßarbeit in Salzburg',
    description:
      'Erste Schneiderei Österreichs mit digitaler Kundenbetreuung. Status am Handy, Handwerk seit 1990. Maxglaner Hauptstraße 64, Salzburg.',
    url: 'https://schneiderei-yueksel.at',
    siteName: 'Schneiderei Yüksel',
    locale: 'de_AT',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Schneiderei Yüksel · Änderungsschneiderei in Salzburg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schneiderei Yüksel · Maßarbeit in Salzburg',
    description:
      'Erste Schneiderei Österreichs mit digitaler Kundenbetreuung. Status am Handy, Handwerk seit 1990.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Pinch-Zoom bleibt erlaubt (Barrierefreiheit), nur Auto-Zoom wird vermieden
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f3ec' },
    { media: '(prefers-color-scheme: dark)', color: '#23261c' },
  ],
  colorScheme: 'light',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://schneiderei-yueksel.at/#organization',
      name: 'Schneiderei Yüksel',
      legalName: 'Kleiderservice Yüksel KG',
      url: 'https://schneiderei-yueksel.at',
      logo: 'https://schneiderei-yueksel.at/logo-mark.svg',
      image: 'https://schneiderei-yueksel.at/opengraph-image',
      email: 'schneiderei.yueksel@gmail.com',
      telephone: '0662 825881',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Maxglaner Hauptstraße 64',
        addressLocality: 'Salzburg',
        postalCode: '5020',
        addressCountry: 'AT',
      },
    },
    {
      '@type': ['LocalBusiness', 'TailorShop'],
      '@id': 'https://schneiderei-yueksel.at/#localbusiness',
      name: 'Schneiderei Yüksel',
      image: 'https://schneiderei-yueksel.at/opengraph-image',
      url: 'https://schneiderei-yueksel.at',
      telephone: '0662 825881',
      email: 'schneiderei.yueksel@gmail.com',
      parentOrganization: {
        '@id': 'https://schneiderei-yueksel.at/#organization',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Maxglaner Hauptstraße 64',
        addressLocality: 'Salzburg',
        postalCode: '5020',
        addressCountry: 'AT',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 47.7963,
        longitude: 13.0186,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://schneiderei-yueksel.at/#webpage',
      url: 'https://schneiderei-yueksel.at',
      name: 'Schneiderei Yüksel · Maßarbeit & Änderungsschneiderei in Salzburg',
      dateModified: '2026-09-12',
      isPartOf: {
        '@id': 'https://schneiderei-yueksel.at/#organization',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" data-scroll-behavior="smooth" className={`${brand.variable} ${body.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
