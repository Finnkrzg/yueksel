import Logo from './Logo'

type ComingSoonProps = {
  address: string
  phone: string
  email: string
  openingHours: string
}

function buildMailtoLink(email: string) {
  const subject = encodeURIComponent('Anfrage – Schneiderei Yüksel')
  return `mailto:${email}?subject=${subject}`
}

export default function ComingSoon({
  address,
  phone,
  email,
  openingHours,
}: ComingSoonProps) {
  const telHref = `tel:${phone.replace(/\s/g, '')}`
  const mapsHref = `https://maps.google.com/?q=${encodeURIComponent(address)}`
  const mailtoHref = buildMailtoLink(email)

  const facts = [
    { label: 'Adresse', value: address, href: mapsHref, external: true },
    { label: 'Telefon', value: phone, href: telHref },
    { label: 'E-Mail', value: email, href: mailtoHref },
    { label: 'Öffnungszeiten', value: openingHours },
  ]

  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-sand-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 8% 0%, rgba(196,132,106,0.12), transparent 50%), radial-gradient(ellipse 55% 40% at 100% 12%, rgba(68,74,52,0.07), transparent 48%)',
        }}
      />

      <header className="relative z-10 flex justify-center px-5 pt-[calc(1.75rem+env(safe-area-inset-top))] sm:pt-10">
        <Logo className="text-olive-950" />
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-14 sm:px-8 sm:py-16 md:py-20">
        <p className="text-[10px] uppercase tracking-[0.32em] text-terracotta-600">
          Neue Website in Arbeit
        </p>
        <h1 className="mt-4 max-w-xl font-[family-name:var(--font-brand)] text-[2rem] leading-[1.08] tracking-[-0.03em] text-olive-950 sm:text-4xl md:text-[2.75rem]">
          Wir arbeiten gerade an unserer neuen Seite.
        </h1>
        <p className="mt-5 max-w-lg font-light leading-relaxed text-olive-800/70 sm:mt-6 sm:text-lg">
          Bis dahin sind wir wie gewohnt für Sie da – Änderungen, Reparaturen,
          Reinigung und Vorhänge in Maxglan. Ohne Termin, während unserer
          Öffnungszeiten.
        </p>

        <dl className="mt-12 grid gap-6 border-y border-olive-950/10 py-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 sm:py-10">
          {facts.map((item) => {
            const content = (
              <>
                <dt className="text-[10px] uppercase tracking-[0.26em] text-olive-800/40">
                  {item.label}
                </dt>
                <dd className="mt-2 break-words text-[0.95rem] font-light leading-relaxed text-olive-950 sm:text-base">
                  {item.value}
                </dd>
              </>
            )

            if (!item.href) {
              return (
                <div key={item.label}>
                  {content}
                </div>
              )
            }

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="block transition-colors hover:text-terracotta-600"
              >
                {content}
              </a>
            )
          })}
        </dl>

        <p className="mt-8 font-light text-olive-800/55">
          Drei Parkplätze liegen nebenan. Wir freuen uns auf Ihren Besuch.
        </p>
      </main>

      <footer className="relative z-10 px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 border-t border-olive-950/10 py-6 text-[0.8rem] font-light text-olive-800/45 sm:flex-row sm:text-sm">
          <span>© {new Date().getFullYear()} Schneiderei Yüksel</span>
          <div className="flex items-center gap-6">
            <a href="/impressum" className="transition-colors hover:text-olive-950">
              Impressum
            </a>
            <a href="/datenschutz" className="transition-colors hover:text-olive-950">
              Datenschutz
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
