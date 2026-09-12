import type { HomepageData } from './types'

/** Fallback-Fakten falls kein Homepage-Fetch möglich */
export const chatFacts = {
  name: 'Schneiderei Yüksel',
  address: 'Maxglaner Hauptstraße 64, 5020 Salzburg',
  phone: '0662 825881',
  email: 'Schneiderei.yueksel@gmail.com',
  openingHours: 'Mo–Fr 08:00–18:00',
  since: 1990,
  parking: 'Ja, Parkplätze nebenan – drei Stellplätze.',
  appointment:
    'Nein, kein Termin nötig – einfach während der Öffnungszeiten vorbeikommen.',
  usp: 'Erste Schneiderei Österreichs mit digitaler Kundenbetreuung: Per Link sehen Kunden am Handy den Status ihrer Anfertigung und wann sie abholbereit ist.',
  services: [
    'Änderungen aller Art',
    'Reparieren',
    'Recycling',
    'Reinigung (Anzüge, Kleider, empfindliche Stoffe)',
    'Teppichreinigung',
    'Vorhangservice (Maßanfertigung)',
  ],
} as const

export function buildChatSystemPrompt(page?: HomepageData | null): string {
  const name = page?.hero?.title || chatFacts.name
  const address = page?.contact?.address || chatFacts.address
  const phone = page?.contact?.phone || chatFacts.phone
  const email = page?.contact?.email || chatFacts.email
  const openingHours = page?.contact?.openingHours || chatFacts.openingHours
  const usp = page?.usp?.text || chatFacts.usp
  const services =
    page?.services?.length
      ? page.services.map((s) => `${s.title}: ${s.description}`).join('; ')
      : chatFacts.services.join('; ')
  const faqBlock =
    page?.faq?.length
      ? page.faq.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')
      : [
          `Q: Gibt es Parkplätze vor Ort?\nA: ${chatFacts.parking}`,
          `Q: Brauche ich einen Termin?\nA: ${chatFacts.appointment}`,
        ].join('\n\n')

  return `Du bist die digitale Assistenz der ${name} in Salzburg.

Antworte immer auf Deutsch, höflich, klar und kurz (meist 1–3 Sätze). Du hilfst nur zu Themen der Schneiderei (Öffnungszeiten, Anfahrt, Leistungen, digitale Kundenbetreuung, FAQ). Keine allgemeinen Ratschläge außerhalb dieses Kontexts.

Bekannte Fakten:
- Adresse: ${address}
- Telefon: ${phone}
- E-Mail: ${email}
- Öffnungszeiten: ${openingHours}
- Seit: ${chatFacts.since}
- USP: ${usp}
- Leistungen: ${services}

FAQ:
${faqBlock}

Wenn du etwas nicht weißt (genaue Preise, konkrete Lieferzeiten), sag das ehrlich und verweise auf Anruf unter ${phone}, E-Mail an ${email} oder Besuch vor Ort. Erfinde keine Preise oder Zusagen.

Ton: warm, ruhig, handwerklich – passend zu einer Traditions-Schneiderei, nicht wie ein Callcenter.`
}

/** @deprecated Nutze buildChatSystemPrompt() */
export const chatSystemPrompt = buildChatSystemPrompt()
