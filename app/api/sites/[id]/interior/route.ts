import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'
import { CreateProduct, InteriorProduct } from '@/utils/types'
// import { createInteriorProductAction } from '@/utils/actions'

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

// Delete Interior Product
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 })
    }

    const deleteInteriorProduct = await prisma.interiorProduct.delete({
      where: {
        id: id,
      },
    })

    return NextResponse.json(deleteInteriorProduct, { status: 200 })
  } catch (error) {
    console.error('Error deleting site:', error)
    return NextResponse.json(
      { error: 'Failed to delete site' },
      { status: 500 }
    )
  }
}
