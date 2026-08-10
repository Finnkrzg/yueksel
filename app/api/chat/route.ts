import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'
import { buildChatSystemPrompt } from '@/lib/chat-knowledge'
import { fallbackHomepage } from '@/lib/fallback'
import { mergeHomepage } from '@/lib/merge-homepage'
import { homepageQuery } from '@/lib/queries'
import type { HomepageData } from '@/lib/types'
import { client } from '@/sanity/lib/client'

export const runtime = 'nodejs'

type ChatRole = 'user' | 'bot'
type ChatMessage = { role: ChatRole; text: string }

const MAX_MESSAGES = 12
const MAX_TEXT_LENGTH = 800

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== 'object') return false
  const msg = value as Record<string, unknown>
  return (
    (msg.role === 'user' || msg.role === 'bot') &&
    typeof msg.text === 'string' &&
    msg.text.trim().length > 0 &&
    msg.text.length <= MAX_TEXT_LENGTH
  )
}

async function getHomepageForChat(): Promise<HomepageData> {
  try {
    const data = await client.fetch<Partial<HomepageData> | null>(homepageQuery)
    return mergeHomepage(data)
  } catch {
    return fallbackHomepage
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Chat ist noch nicht konfiguriert. Bitte GEMINI_API_KEY setzen.' },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
  }

  const rawMessages = (body as { messages?: unknown })?.messages
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return NextResponse.json({ error: 'Keine Nachrichten übermittelt.' }, { status: 400 })
  }

  const messages = rawMessages.filter(isChatMessage).slice(-MAX_MESSAGES)
  if (messages.length === 0) {
    return NextResponse.json({ error: 'Keine gültigen Nachrichten.' }, { status: 400 })
  }

  const last = messages[messages.length - 1]
  if (last.role !== 'user') {
    return NextResponse.json(
      { error: 'Die letzte Nachricht muss vom Nutzer stammen.' },
      { status: 400 },
    )
  }

  try {
    const page = await getHomepageForChat()
    const systemInstruction = buildChatSystemPrompt(page)

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      // Aktuell in AI Studio: 3.6 Flash / 3.5 Flash / 3.5 Flash Lite
      model: 'gemini-3.5-flash-lite',
      systemInstruction,
    })

    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === 'user' ? ('user' as const) : ('model' as const),
      parts: [{ text: msg.text.trim() }],
    }))

    // Gemini verlangt, dass History mit user beginnt
    const trimmedHistory =
      history[0]?.role === 'model' ? history.slice(1) : history

    const chat = model.startChat({ history: trimmedHistory })
    const result = await chat.sendMessage(last.text.trim())
    const text = result.response.text()?.trim()

    if (!text) {
      return NextResponse.json(
        { error: 'Keine Antwort vom Assistenten erhalten.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ text })
  } catch (error) {
    console.error('[chat]', error)
    return NextResponse.json(
      { error: 'Der Assistent ist gerade nicht erreichbar. Bitte später erneut versuchen.' },
      { status: 502 },
    )
  }
}
