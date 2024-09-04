import prisma from '@/utils/db'
import { clerkClient, User } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const users = await clerkClient.users.getUserList({ orderBy: 'first_name' })
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const { userId, siteId } = await req.json()

    if (!userId || !siteId) {
      return NextResponse.json(
        { message: 'Missing userId or siteId' },
        { status: 400 }
      )
    }

    // Check if the UserSite record already exists
    const existingUserSite = await prisma.userSite.findUnique({
      where: {
        userId_siteId: {
          userId,
          siteId,
        },
      },
    })

    if (existingUserSite) {
      return NextResponse.json(
        {
          message: 'User is already assigned to this site',
          userSite: existingUserSite,
        },
        { status: 200 }
      )
    }

    // Create a new UserSite record
    const userSite = await prisma.userSite.create({
      data: {
        userId,
        siteId,
      },
    })

    return NextResponse.json(
      { message: 'User assigned to site successfully', userSite },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error assigning user to site:', error) // Log the error for debugging
    return NextResponse.json(
      { message: 'Error assigning user to site', error },
      { status: 500 }
    )
  }
}
