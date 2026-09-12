import { NextResponse } from 'next/server'

/** Test-E-Mail – vor Go-Live wieder auf Schneiderei.yueksel@gmail.com setzen */
const CONTACT_EMAIL = 'finnkrue@icloud.com'

type ContactPayload = {
  name?: string
  email?: string
  message?: string
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  let body: ContactPayload

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
  }

  const name = body.name?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const message = body.message?.trim() ?? ''

  if (!name || name.length < 2) {
    return NextResponse.json(
      { error: 'Bitte geben Sie Ihren Namen an.' },
      { status: 400 },
    )
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.' },
      { status: 400 },
    )
  }

  if (!message || message.length < 10) {
    return NextResponse.json(
      { error: 'Bitte schreiben Sie eine Nachricht (mindestens 10 Zeichen).' },
      { status: 400 },
    )
  }

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Anfrage von ${name} – Schneiderei Yüksel`,
        _template: 'table',
        _captcha: 'false',
      }),
    },
  )

  if (!response.ok) {
    console.error('FormSubmit error:', await response.text())
    return NextResponse.json(
      { error: 'Nachricht konnte nicht gesendet werden. Bitte rufen Sie uns an.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
