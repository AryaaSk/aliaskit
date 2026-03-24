import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('waitlist')
      .insert({ email: email.toLowerCase().trim() })

    if (error) {
      // Postgres unique violation code
      if (error.code === '23505') {
        return NextResponse.json({ duplicate: true }, { status: 200 })
      }
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error.' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Waitlist route error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
