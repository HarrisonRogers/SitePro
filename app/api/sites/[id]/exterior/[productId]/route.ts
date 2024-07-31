import prisma from '@/utils/db'
import { ExteriorProduct } from '@/utils/types'
import { NextResponse } from 'next/server'

export async function getProductAction(
  siteId: string,
  productId: string
): Promise<ExteriorProduct | null> {
  try {
    const product = await prisma.exteriorProduct.findUnique({
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
    } as ExteriorProduct
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
    const exteriorProducts = await prisma.exteriorProduct.findUnique({
      where: { id: productId },
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
