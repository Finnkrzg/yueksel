import { defineArrayMember, defineField, defineType } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Startseite',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'usp', title: 'Atelier / App' },
    { name: 'services', title: 'Services' },
    { name: 'about', title: 'Familie' },
    { name: 'faq', title: 'FAQ' },
    { name: 'contact', title: 'Kontakt' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'title',
          title: 'Titel',
          type: 'string',
          initialValue: 'Schneiderei Yüksel',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Untertitel',
          type: 'text',
          rows: 3,
          initialValue:
            'Die erste Schneiderei Österreichs mit digitaler Kundenbetreuung – Handwerk seit 1990 in Salzburg.',
        }),
        defineField({
          name: 'videoUrl',
          title: 'Hintergrund-Video',
          type: 'url',
          description:
            'Vimeo-, YouTube- oder direkte MP4-URL (z. B. https://vimeo.com/1216855830)',
          initialValue: 'https://vimeo.com/1216855830',
        }),
      ],
    }),
    defineField({
      name: 'usp',
      title: 'Atelier / digitale Kundenbetreuung',
      type: 'object',
      group: 'usp',
      fields: [
        defineField({
          name: 'title',
          title: 'Titel',
          type: 'string',
          initialValue: 'Digitale Kundenbetreuung.',
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'text',
          rows: 4,
          description:
            'Erste Schneiderei Österreichs mit digitaler Kundenbetreuung; Status & Abholbereit am Handy',
          initialValue:
            'Als erste Schneiderei in Österreich begleiten wir Sie digital: Per Link sehen Sie am Handy den Status Ihrer Anfertigung und wann sie abholbereit ist – persönlich, transparent, ohne Anruf.',
        }),
        defineField({
          name: 'mainImage',
          title: 'Hauptbild (hinter dem Handy)',
          type: 'image',
          options: { hotspot: true },
          description: 'Großes Atelier-/Laden-Foto neben dem Text',
        }),
        defineField({
          name: 'detailImage',
          title: 'Detailbild (klein)',
          type: 'image',
          options: { hotspot: true },
          description: 'Kleines überlappendes Foto – ideal Arbeit/Schneiden',
        }),
        defineField({
          name: 'gallery',
          title: 'Fotostreifen',
          type: 'array',
          description: '3–4 atmosphärische Fotos unter dem App-Abschnitt (Werkstatt, Schneiden, Reception …)',
          of: [
            defineArrayMember({
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          validation: (rule) => rule.max(4),
        }),
      ],
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'services',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'service',
          fields: [
            defineField({
              name: 'title',
              title: 'Titel',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Beschreibung',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'Familie',
      type: 'object',
      group: 'about',
      fields: [
        defineField({
          name: 'talha',
          title: 'Talha',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Foto',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'description',
              title: 'Beschreibung',
              type: 'text',
              rows: 4,
              initialValue:
                'Talha führt das Atelier mit digitaler Kundenbetreuung und dem Anspruch, Handwerk zeitgemäß erlebbar zu machen.',
            }),
          ],
        }),
        defineField({
          name: 'senior',
          title: 'Senior',
          type: 'object',
          description: 'Bitte hier pflegen (ersetzt das frühere Feld „Vater“)',
          fields: [
            defineField({
              name: 'image',
              title: 'Foto',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'description',
              title: 'Beschreibung',
              type: 'text',
              rows: 4,
              initialValue:
                'Seit 1990 steht er für gelebtes Handwerk in Salzburg und nachhaltige Präzision.',
            }),
          ],
        }),
        // Bestehende Inhalte unter „vater“ bleiben lesbar; Website nutzt coalesce(senior, vater)
        defineField({
          name: 'vater',
          title: 'Senior (alt)',
          type: 'object',
          hidden: true,
          deprecated: {
            reason: 'Bitte Inhalte nach „Senior“ übernehmen – dieses Feld wird nur noch gelesen.',
          },
          fields: [
            defineField({
              name: 'image',
              title: 'Foto',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'description',
              title: 'Beschreibung',
              type: 'text',
              rows: 4,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'faq',
      title: 'Häufige Fragen',
      type: 'array',
      group: 'faq',
      description: 'Erscheint auf der Website und fließt in den Chatbot-Kontext ein',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({
              name: 'question',
              title: 'Frage',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Antwort',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'question', subtitle: 'answer' },
          },
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Kontakt',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({
          name: 'address',
          title: 'Adresse',
          type: 'string',
          initialValue: 'Maxglaner Hauptstraße 64, 5020 Salzburg',
        }),
        defineField({
          name: 'phone',
          title: 'Telefon',
          type: 'string',
          initialValue: '0662 825881',
        }),
        defineField({
          name: 'email',
          title: 'E-Mail',
          type: 'string',
          initialValue: 'info@schneiderei-yueksel.at',
        }),
        defineField({
          name: 'openingHours',
          title: 'Öffnungszeiten',
          type: 'text',
          rows: 3,
          description: 'Für Website-Chatbot und interne Infos (z. B. Mo–Fr 9–18, Sa geschlossen)',
          initialValue: 'Mo–Fr 09:00–18:00, Sa geschlossen',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Startseite' }
    },
  },
})
