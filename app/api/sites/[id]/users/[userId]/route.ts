import prisma from '@/utils/db'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string; userId: string } }
) {
  try {
    const { id, userId } = params

    // Check if the userSite exists
    const existingUserSite = await prisma.userSite.findUnique({
      where: {
        userId_siteId: {
          userId,
          siteId: id,
        },
      },
    })

    if (!existingUserSite) {
      return NextResponse.json(
        { message: 'UserSite record not found' },
        { status: 404 }
      )
    }

    // Delete prisma UserSite
    await prisma.userSite.delete({
      where: {
        userId_siteId: {
          userId,
          siteId: id,
        },
      },
    })

    return NextResponse.json(
      { message: 'User unassigned from site successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error unassigning user from site:', error)
    return NextResponse.json(
      { message: 'Error unassigning user from site', error },
      { status: 500 }
    )
  }
}
