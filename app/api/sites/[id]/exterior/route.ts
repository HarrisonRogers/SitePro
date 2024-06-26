import { NextResponse } from 'next/server'
import prisma from '@/utils/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  try {
    const exteriorProducts = await prisma.exteriorProduct.findMany({
      where: { siteId: id },
      include: {
        maintenanceInstructions: true,
        installers: true,
      },
    })
    return NextResponse.json(exteriorProducts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching exterior products' },
      { status: 500 }
    )
  }
}
