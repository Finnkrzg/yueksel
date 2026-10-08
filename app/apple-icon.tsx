import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function AppleIcon() {
  const fontData = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/barlow-condensed@5.2.5/latin-600-normal.ttf',
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f7f3ec',
          color: '#23261c',
          fontSize: 148,
          fontWeight: 600,
          lineHeight: 1,
          fontFamily: 'Barlow Condensed',
        }}
      >
        Y
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Barlow Condensed',
          data: fontData,
          style: 'normal',
          weight: 600,
        },
      ],
    },
  )
}
