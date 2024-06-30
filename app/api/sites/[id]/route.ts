import { NextResponse } from 'next/server'
import prisma from '@/utils/db'

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
