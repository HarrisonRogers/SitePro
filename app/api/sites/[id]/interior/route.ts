import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'
import { CreateProduct, InteriorProduct } from '@/utils/types'
import { createInteriorProductAction } from '@/utils/actions'

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

// Create Product
export async function POST(req: NextRequest) {
  try {
    const { values, siteId }: { values: CreateProduct; siteId: string } =
      await req.json()
    const product = await createInteriorProductAction(values, siteId)

    if (product) {
      return NextResponse.json(product, { status: 200 })
    } else {
      return NextResponse.json(
        { error: 'failed to create interior product' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error handleing request:', error)
    return NextResponse.json(
      { error: 'Failed to create interior product' },
      { status: 500 }
    )
  }
}
