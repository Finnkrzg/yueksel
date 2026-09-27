type LogoProps = {
  className?: string
}

/** Wortmarke – Agency FB wenn lokal vorhanden, sonst Barlow Condensed */
export default function Logo({ className = '' }: LogoProps) {
  return (
    <span
      className={`flex flex-col items-center leading-none ${className}`}
      style={{
        fontFamily:
          '"Agency FB", "AgencyFB", var(--font-logo), sans-serif',
      }}
    >
      <span className="text-[0.82rem] font-semibold uppercase tracking-[0.05em] whitespace-nowrap sm:text-[0.95rem] sm:tracking-[0.06em] md:text-[1.05rem]">
        <span className="-mr-[0.05em] inline-block sm:-mr-[0.06em]">
          Schneiderei Yüksel
        </span>
      </span>
      <span aria-hidden className="mt-1.5 h-px w-full bg-current opacity-40" />
      <span className="mt-1.5 text-[0.48rem] font-medium uppercase tracking-[0.28em] opacity-75 sm:text-[0.52rem] sm:tracking-[0.32em] md:text-[0.58rem]">
        <span className="-mr-[0.28em] inline-block sm:-mr-[0.32em]">Salzburg</span>
      </span>
    </span>
  )
}
