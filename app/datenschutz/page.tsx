import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Schneiderei Yüksel Salzburg',
  robots: 'noindex, follow',
}

export default function DatenschutzPage() {
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
            Datenschutzerklärung
          </h1>

          <div className="space-y-10 text-sm font-light leading-relaxed text-olive-800/80 md:text-base">
            <section>
              <h2 className="mb-4 font-[family-name:var(--font-brand)] text-xl text-olive-950">
                1. Datenschutz auf einen Blick
              </h2>
              <p>
                Wir, die Kleiderservice Yüksel KG, nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (DSGVO, DSG, TKG 2003) sowie dieser Datenschutzerklärung.
              </p>
              <p className="mt-2">
                Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-[family-name:var(--font-brand)] text-xl text-olive-950">
                2. Verantwortlicher für die Datenverarbeitung
              </h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="mt-2">
                <strong>Kleiderservice Yüksel KG</strong>
                <br />
                Maxglaner Hauptstraße 64
                <br />
                5020 Salzburg
                <br />
                Österreich
              </p>
              <p className="mt-2">
                Telefon: 0662 825881
                <br />
                E-Mail: Schneiderei.yueksel@gmail.com
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-[family-name:var(--font-brand)] text-xl text-olive-950">
                3. Datenerfassung auf unserer Website
              </h2>
              <h3 className="mt-6 mb-2 font-medium text-olive-900">Server-Log-Dateien</h3>
              <p>
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="mt-2 ml-4 list-disc space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="mt-2">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet, sowie unser berechtigtes Interesse an der fehlerfreien Darstellung und Optimierung unserer Website.
              </p>

              <h3 className="mt-6 mb-2 font-medium text-olive-900">Cookies</h3>
              <p>
                Unsere Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
              </p>
              <p className="mt-2">
                Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies“. Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
              </p>
              <p className="mt-2">
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browser aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-[family-name:var(--font-brand)] text-xl text-olive-950">
                4. Analyse-Tools und Tools von Drittanbietern
              </h2>
              
              <h3 className="mt-6 mb-2 font-medium text-olive-900">Google Analytics</h3>
              <p>
                Soweit Sie Ihre Einwilligung erteilt haben (Art. 6 Abs. 1 lit. a DSGVO), nutzt diese Website Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
              </p>
              <p className="mt-2">
                Google Analytics verwendet zielgerichtete Cookies. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Wir haben auf dieser Website die Funktion IP-Anonymisierung aktiviert. Dadurch wird Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum vor der Übermittlung in die USA gekürzt.
              </p>
              <p className="mt-2">
                Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern. Sie können darüber hinaus die Erfassung der durch den Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem Sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: <a href="https://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noopener noreferrer" className="text-terracotta-600 hover:underline">https://tools.google.com/dlpage/gaoptout?hl=de</a>.
              </p>

              <h3 className="mt-6 mb-2 font-medium text-olive-900">Digitale Assistenz (Google Gemini API)</h3>
              <p>
                Auf unserer Website bieten wir eine digitale Assistenz (Chatbot) an, um Ihre Fragen schnell und effizient zu beantworten. Zur Verarbeitung Ihrer Anfragen nutzen wir die Gemini API, bereitgestellt von Google Ireland Limited.
              </p>
              <p className="mt-2">
                Wenn Sie den Chatbot nutzen, werden die von Ihnen eingegebenen Texte an Server von Google übermittelt, um eine passende Antwort zu generieren. Wir bitten Sie, in diesem Chat keine sensiblen personenbezogenen Daten (wie z.B. Kontodaten, Passwörter oder detaillierte persönliche Informationen) einzugeben. Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO) an einem modernen und effizienten Kundenservice.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-[family-name:var(--font-brand)] text-xl text-olive-950">
                5. Ihre Rechte
              </h2>
              <p>
                Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei uns (Schneiderei.yueksel@gmail.com) oder der Datenschutzbehörde beschweren.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
