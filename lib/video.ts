export type VideoSource =
  | { kind: 'file'; src: string }
  | { kind: 'vimeo'; id: string }
  | { kind: 'youtube'; id: string }
  | { kind: 'unknown'; src: string }

export function resolveVideoSource(url: string): VideoSource {
  const raw = url?.trim()
  if (!raw) return { kind: 'unknown', src: '' }

  try {
    const parsed = new URL(raw)
    const host = parsed.hostname.replace(/^www\./, '')

    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const match = parsed.pathname.match(/\/(?:video\/)?(\d+)/)
      if (match?.[1]) return { kind: 'vimeo', id: match[1] }
    }

    if (
      host === 'youtube.com' ||
      host === 'm.youtube.com' ||
      host === 'youtube-nocookie.com'
    ) {
      const id = parsed.searchParams.get('v')
      if (id) return { kind: 'youtube', id }
      const embed = parsed.pathname.match(/\/embed\/([\w-]+)/)
      if (embed?.[1]) return { kind: 'youtube', id: embed[1] }
    }

    if (host === 'youtu.be') {
      const id = parsed.pathname.replace('/', '')
      if (id) return { kind: 'youtube', id }
    }

    if (/\.(mp4|webm|ogg)(\?|$)/i.test(parsed.pathname + parsed.search)) {
      return { kind: 'file', src: raw }
    }

    // Direkte CDN-/File-URLs ohne Endung oft noch als File behandeln
    if (!host.includes('youtube') && !host.includes('vimeo')) {
      return { kind: 'file', src: raw }
    }
  } catch {
    return { kind: 'unknown', src: raw }
  }

  return { kind: 'unknown', src: raw }
}
