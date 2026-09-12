type LogoProps = {
  className?: string
}

/** Wortmarke Schneiderei Yüksel – ohne Emblem */
export default function Logo({ className = '' }: LogoProps) {
  return (
    <span className={`flex flex-col items-center leading-none ${className}`}>
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.1em] whitespace-nowrap sm:text-[0.8rem] sm:tracking-[0.16em] md:text-[0.92rem]">
        <span className="-mr-[0.1em] inline-block sm:-mr-[0.16em]">
          Schneiderei Yüksel
        </span>
      </span>
      <span aria-hidden className="mt-1 h-px w-full bg-current opacity-30" />
      <span className="mt-1 text-[0.45rem] uppercase tracking-[0.34em] opacity-70 sm:text-[0.5rem] sm:tracking-[0.48em] md:text-[0.55rem]">
        <span className="-mr-[0.34em] inline-block sm:-mr-[0.48em]">Salzburg</span>
      </span>
    </span>
  )
}
