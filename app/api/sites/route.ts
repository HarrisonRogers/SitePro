import { NextRequest, NextResponse } from 'next/server'
import { getAllSites } from '@/utils/actions'
import { auth, clerkClient } from '@clerk/nextjs/server'

export async function GET() {
  try {
    const sites = await getAllSites()
    return NextResponse.json(sites)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching sites' }, { status: 500 })
  }
}

// Assign Role
export async function POST(request: NextRequest) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const user = await clerkClient.users.getUser(userId)
    const role = user.publicMetadata.role

    if (!role) {
      await clerkClient.users.updateUser(userId, {
        publicMetadata: { role: 'client' },
      })
      return NextResponse.json({ message: 'Role assigned successfully' })
    }

    return NextResponse.json({ message: 'Role already assigned' })
  } catch (error) {
    console.error('Error assigning role:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
