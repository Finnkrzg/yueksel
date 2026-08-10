type StitchProps = {
  className?: string
  tone?: 'light' | 'dark'
}

/** Gestrichelte Nahtlinie – wiederkehrendes Atelier-Motiv */
export default function Stitch({ className = '', tone = 'dark' }: StitchProps) {
  const color = tone === 'light' ? 'rgba(247,243,236,0.28)' : 'rgba(44,48,36,0.18)'

  return (
    <div
      aria-hidden
      className={`h-px w-full ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(90deg, ${color} 0 6px, transparent 6px 12px)`,
      }}
    />
  )
}
