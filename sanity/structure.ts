import type { StructureResolver } from 'sanity/structure'

// Singleton-Struktur: nur die Startseite als redaktioneller Einstieg
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhalt')
    .items([
      S.listItem()
        .title('Startseite')
        .id('homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .title('Startseite'),
        ),
    ])
