import { NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  const payload = await request.json()

  if (payload.type === 'user.created') {
    const userId = payload.data.id

    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role: 'client' },
    })
  }

  return NextResponse.json({ success: true })
}
