import prisma from '@/utils/db'
import { CreateProduct, ExteriorProduct } from '@/utils/types'
import { NextRequest, NextResponse } from 'next/server'

export async function editExteriorProduct(
  siteId: string,
  productId: string,
  values: CreateProduct
): Promise<ExteriorProduct | null> {
  try {
    const exteriorProduct = await prisma.exteriorProduct.update({
      where: { id: productId },
      data: {
        name: values.name,
        supplier: values.supplier,
        siteId: siteId,
        maintenanceInstructions: {
          deleteMany: {}, // Delete all existing maintenance instructions
          create: values.maintenanceInstructions.map((instruction) => ({
            actionRequired: instruction.actionRequired,
            frequency: instruction.frequency,
            dueOn: new Date(instruction.dueOn), // Convert string to Date
          })),
        },
        installers: {
          deleteMany: {}, // Delete all existing installers
          create: values.installers.map((installer) => ({
            name: installer.name,
            contact: installer.contact,
          })),
        },
      },
      include: {
        maintenanceInstructions: true,
        installers: true,
        site: true,
      },
    })

    return {
      ...exteriorProduct,
      maintenanceInstructions: exteriorProduct.maintenanceInstructions.map(
        (instruction) => ({
          ...instruction,
          dueOn: instruction.dueOn.toISOString(),
          interiorProductId: instruction.interiorProductId ?? null,
          exteriorProductId: instruction.exteriorProductId ?? null,
        })
      ),
      installers: exteriorProduct.installers.map((installer) => ({
        ...installer,
        interiorProducts: [], // Provide default or empty values
        exteriorProducts: [], // Provide default or empty values
      })),
      site: {
        ...exteriorProduct.site,
        createdAt: exteriorProduct.site.createdAt.toISOString(),
        updatedAt: exteriorProduct.site.updatedAt.toISOString(),
        buildStart: exteriorProduct.site.buildStart.toISOString(),
        interiorProducts: [],
        exteriorProducts: [],
      },
    }
  } catch (error) {
    console.error('Error updating exterior product:', error)
    return null
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const {
      values,
      siteId,
      productId,
    }: { values: CreateProduct; siteId: string; productId: string } =
      await req.json()
    const product = await editExteriorProduct(siteId, productId, values)

    if (product) {
      return NextResponse.json(product, { status: 200 })
    } else {
      return NextResponse.json(
        { error: 'failed to edit exterior product' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error handling request:', error)
    return NextResponse.json(
      { error: 'Failed to edit exterior product' },
      { status: 500 }
    )
  }
}
