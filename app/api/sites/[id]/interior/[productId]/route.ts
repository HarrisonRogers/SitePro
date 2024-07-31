import prisma from '@/utils/db'
import { InteriorProduct } from '@/utils/types'
import { NextResponse } from 'next/server'

export async function getProductAction(
  siteId: string,
  productId: string
): Promise<InteriorProduct | null> {
  try {
    const product = await prisma.interiorProduct.findUnique({
      where: {
        id: productId,
        siteId: siteId,
      },
      include: {
        maintenanceInstructions: true,
        installers: true,
      },
    })

    if (!product) {
      throw new Error('Product not found')
    }

    return {
      ...product,
      maintenanceInstructions: product.maintenanceInstructions.map(
        (instruction) => ({
          ...instruction,
          dueOn: instruction.dueOn.toISOString(),
        })
      ),
    } as InteriorProduct
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const { productId } = params
  try {
    const interiorProducts = await prisma.interiorProduct.findUnique({
      where: { id: productId },
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
