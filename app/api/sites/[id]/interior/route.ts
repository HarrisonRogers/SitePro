import { NextResponse } from 'next/server'
import prisma from '@/utils/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  try {
    const interiorProducts = await prisma.interiorProduct.findMany({
      where: { siteId: id },
      include: {
        maintenanceInstructions: true,
        installers: true,
      },
    })
    return NextResponse.json(interiorProducts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching interior products' },
      { status: 500 }
    )
  }
}
