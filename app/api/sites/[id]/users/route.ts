import { clerkClient, User } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const users = await clerkClient.users.getUserList({ orderBy: 'first_name' })
    console.log(users)
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
