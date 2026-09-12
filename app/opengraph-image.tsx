import { ImageResponse } from 'next/og'

export const alt = 'Schneiderei Yüksel · Änderungsschneiderei in Salzburg'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f7f3ec',
          padding: '72px 80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#a85f42',
          }}
        >
          Salzburg · Seit 1990
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 84,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#23261c',
            }}
          >
            Schneiderei Yüksel
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              maxWidth: 760,
              fontSize: 30,
              lineHeight: 1.4,
              color: '#4a5140',
            }}
          >
            Änderungsschneiderei in Maxglan – Maßarbeit, Reparatur und digitale
            Kundenbetreuung.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            color: '#4a5140',
          }}
        >
          Maxglaner Hauptstraße 64 · 5020 Salzburg
        </div>
      </div>
    ),
    { ...size },
  )
}
