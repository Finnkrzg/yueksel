const items = [
  'Erste digitale Kundenbetreuung Österreichs',
  'Schneiderei Yüksel',
  'Seit 1990',
  'Maxglan · Salzburg',
  'Status und Abholbereit am Handy',
  'Kein Termin nötig',
]

export default function MarqueeBand() {
  const row = [...items, ...items]

  return (
    <div className="relative overflow-hidden border-y border-olive-950/10 bg-olive-950 py-3.5 text-sand-50 sm:py-4">
      <div className="marquee-track flex w-max gap-7 whitespace-nowrap sm:gap-10">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-7 text-[10px] uppercase tracking-[0.24em] text-sand-50/75 sm:gap-10 sm:text-[11px] sm:tracking-[0.32em]"
          >
            {item}
            <span className="inline-block h-1 w-1 rounded-full bg-terracotta-400" />
          </span>
        ))}
      </div>
    </div>
  )
}
