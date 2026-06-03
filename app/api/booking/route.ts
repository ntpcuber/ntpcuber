import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL
  if (!scriptUrl) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  try {
    await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
    })
  } catch (err) {
    console.error('Apps Script forward failed:', err)
  }

  return NextResponse.json({ ok: true })
}