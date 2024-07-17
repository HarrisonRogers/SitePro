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

// Delete Exterior Product
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 })
    }

    const deleteExteriorProduct = await prisma.exteriorProduct.delete({
      where: {
        id: id,
      },
    })

    return NextResponse.json(deleteExteriorProduct, { status: 200 })
  } catch (error) {
    console.error('Error deleting site:', error)
    return NextResponse.json(
      { error: 'Failed to delete site' },
      { status: 500 }
    )
  }
}
