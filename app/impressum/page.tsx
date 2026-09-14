import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Impressum | Schneiderei Yüksel Salzburg',
  robots: 'noindex, follow', // Impressum muss nicht in den Suchergebnissen ranken
}

export default function ImpressumPage() {
  return (
    <>
      <Navbar brand="Schneiderei Yüksel" />
      <main className="min-h-screen bg-sand-50 px-6 py-32 md:px-12 md:py-40">
        <div className="mx-auto max-w-3xl">
          <Link 
            href="/" 
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-olive-800/60 transition-colors hover:text-terracotta-600"
          >
            <ArrowLeft size={16} />
            Zurück zur Startseite
          </Link>
          
          <h1 className="mb-12 font-[family-name:var(--font-brand)] text-4xl tracking-tight text-olive-950 md:text-5xl">
            Impressum
          </h1>

          <div className="space-y-10 text-sm font-light leading-relaxed text-olive-800/80 md:text-base">
            <section>
              <h2 className="mb-4 font-[family-name:var(--font-brand)] text-xl text-olive-950">
                Angaben gemäß § 5 ECG und § 25 MedienG
              </h2>
              <p>
                <strong>Kleiderservice Yüksel KG</strong>
                <br />
                Maxglaner Hauptstraße 64
                <br />
                A – 5020 Salzburg
              </p>
              <p className="mt-4">
                <strong>Kontakt:</strong>
                <br />
                Tel: <a href="tel:+43662825881" className="hover:text-terracotta-600 transition-colors">0662 825881</a>
                <br />
                Web: <a href="https://www.schneiderei-yueksel.at" className="hover:text-terracotta-600 transition-colors">www.schneiderei-yueksel.at</a>
                <br />
                E-Mail: <a href="mailto:schneiderei.yueksel@gmail.com" className="hover:text-terracotta-600 transition-colors">schneiderei.yueksel@gmail.com</a>
              </p>
              <p className="mt-4">
                <strong>Firmenbuchnummer:</strong> FN 196225t
                <br />
                <strong>UID-Nummer:</strong> ATU 54 55 3601
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-[family-name:var(--font-brand)] text-xl text-olive-950">
                Haftungsbeschränkung
              </h2>
              <p>
                Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Die Kleiderservice Yüksel KG übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte. Die Nutzung der abrufbaren Inhalte erfolgt auf eigene Gefahr des Nutzers. Namentlich gekennzeichnete Beiträge geben die Meinung des jeweiligen Autors und nicht immer die Meinung des Anbieters wieder.
              </p>
              <p className="mt-2">
                Mit der reinen Nutzung der Website kommt keinerlei Vertragsverhältnis zwischen dem Nutzer und dem Anbieter zustande. Wir behalten uns vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-[family-name:var(--font-brand)] text-xl text-olive-950">
                Externe Links
              </h2>
              <p>
                Diese Website enthält Verknüpfungen zu Websites Dritter ("externe Links"). Diese Websites unterliegen der Haftung der jeweiligen Betreiber. Die Kleiderservice Yüksel KG hat bei der erstmaligen Verknüpfung der externen Links die fremden Inhalte daraufhin überprüft, ob etwaige Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine Rechtsverstöße ersichtlich. Die Kleiderservice Yüksel KG hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der verknüpften Seiten.
              </p>
              <p className="mt-2">
                Das Setzen von externen Links bedeutet nicht, dass sich die Kleiderservice Yüksel KG die hinter dem Verweis oder Link liegenden Inhalte zu Eigen macht. Eine ständige Kontrolle dieser externen Links ist für den Anbieter ohne konkrete Hinweise auf Rechtsverstöße nicht zumutbar. Bei Kenntnis von Rechtsverstößen werden jedoch derartige externe Links unverzüglich gelöscht.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-[family-name:var(--font-brand)] text-xl text-olive-950">
                Urheberrecht (Copyright)
              </h2>
              <p>
                Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem österreichischen Urheberrecht. Jede vom österreichischen Urheberrecht nicht zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung des jeweiligen Autors oder Urhebers. Dies gilt insbesondere für Vervielfältigung, Bearbeitung, Übersetzung, Einspeicherung, Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder anderen elektronischen Medien und Systemen.
              </p>
              <p className="mt-2">
                <strong>Copyright Fotos:</strong> Talha Yüksel. Alle Rechte vorbehalten.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
