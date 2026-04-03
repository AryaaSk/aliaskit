import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

interface HealthCheck {
  status: 'ok' | 'degraded' | 'down'
  latency_ms: number
  error?: string
}

interface HealthResponse {
  status: 'ok' | 'degraded' | 'down'
  timestamp: string
  version: string
  checks: {
    database: HealthCheck
  }
}

async function checkDatabase(): Promise<HealthCheck> {
  const start = Date.now()
  try {
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.from('identities').select('id').limit(1)
    const latency_ms = Date.now() - start
    if (error) {
      return { status: 'down', latency_ms, error: error.message }
    }
    return { status: 'ok', latency_ms }
  } catch (err) {
    return {
      status: 'down',
      latency_ms: Date.now() - start,
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}

export async function GET() {
  const database = await checkDatabase()

  const allChecks = [database]
  const anyDown = allChecks.some((c) => c.status === 'down')
  const anyDegraded = allChecks.some((c) => c.status === 'degraded')

  const overallStatus = anyDown ? 'down' : anyDegraded ? 'degraded' : 'ok'

  const body: HealthResponse = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION ?? 'unknown',
    checks: { database },
  }

  const httpStatus = overallStatus === 'ok' ? 200 : overallStatus === 'degraded' ? 200 : 503

  return NextResponse.json(body, { status: httpStatus })
}
