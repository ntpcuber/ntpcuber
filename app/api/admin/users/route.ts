// app/api/admin/users/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!   // never expose this client-side
)

export async function POST(req: Request) {
  const { ids } = await req.json() as { ids: string[] }

  const results = await Promise.allSettled(
    ids.map(id => adminClient.auth.admin.getUserById(id))
  )

  const users = results
    .map((r, i) => ({
      id: ids[i],
      email: r.status === 'fulfilled' ? r.value.data?.user?.email ?? '—' : '—',
      name:  r.status === 'fulfilled'
        ? r.value.data?.user?.user_metadata?.full_name ?? r.value.data?.user?.email?.split('@')[0] ?? '—'
        : '—',
    }))

  return NextResponse.json(users)
}