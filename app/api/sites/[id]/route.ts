import { NextResponse } from 'next/server'
import prisma from '@/utils/db'

// Get site info
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  try {
    const singleSite = await prisma.site.findUnique({
      where: { id: id },
    })

    if (!singleSite) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }
    return NextResponse.json(singleSite)
  } catch (error) {
    console.error('Error fetching single site:', error)
    return NextResponse.json(
      { error: 'Error fetching single site' },
      { status: 500 }
    )
  }
}

// Delete Site info
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const deleteSite = await prisma.site.delete({
      where: {
        id: id,
      },
    })

    return NextResponse.json(deleteSite, { status: 200 })
  } catch (error) {
    console.error('Error deleteing site:', error)
    return NextResponse.json(
      { error: 'Falied to delete site' },
      { status: 500 }
    )
  }
}
