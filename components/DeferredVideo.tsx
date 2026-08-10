'use client'

import { useEffect, useState } from 'react'
import { resolveVideoSource } from '@/lib/video'

/**
 * 16:9 „cover“: so weit rausgezoomt wie möglich, Viewport bleibt voll gefüllt
 * (kein Letterboxing / keine leeren Ränder). Parent braucht overflow-hidden.
 */
const coverClassName =
  'pointer-events-none absolute top-1/2 left-1/2 h-[max(100%,56.25vw)] w-[max(100%,177.78vh)] -translate-x-1/2 -translate-y-1/2 border-0'

type DeferredVideoProps = {
  videoUrl: string
}

const VIMEO_POSTERS: Record<string, string> = {
  '1216855830':
    'https://i.vimeocdn.com/video/2188396371-06f8865528c9841f5836be1f4d460bc81b3851e24f29f523853303343265949c-d_1280x720',
}

export default function DeferredVideo({ videoUrl }: DeferredVideoProps) {
  const source = resolveVideoSource(videoUrl)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Sofort im nächsten Frame – kein Idle-Delay mehr
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const poster =
    source.kind === 'vimeo' ? VIMEO_POSTERS[source.id] : undefined

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#1a1814]">
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
      ) : null}

      {ready && source.kind === 'vimeo' ? (
        <iframe
          title="Hintergrundvideo"
          src={`https://player.vimeo.com/video/${source.id}?autoplay=1&muted=1&loop=1&autopause=0&background=1&byline=0&title=0&portrait=0&controls=0&dnt=1`}
          className={coverClassName}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : null}

      {ready && source.kind === 'youtube' ? (
        <iframe
          title="Hintergrundvideo"
          src={`https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${source.id}&playsinline=1&modestbranding=1&rel=0`}
          className={coverClassName}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : null}

      {ready && source.kind !== 'vimeo' && source.kind !== 'youtube' ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          key={videoUrl}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : null}
    </div>
  )
}
