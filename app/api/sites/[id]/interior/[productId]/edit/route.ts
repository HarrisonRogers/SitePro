import prisma from '@/utils/db'
import { CreateProduct, InteriorProduct } from '@/utils/types'
import { NextRequest, NextResponse } from 'next/server'

export async function editInteriorProduct(
  siteId: string,
  productId: string,
  values: CreateProduct
): Promise<InteriorProduct | null> {
  try {
    const interiorProduct = await prisma.interiorProduct.update({
      where: { id: productId },
      data: {
        name: values.name,
        supplier: values.supplier,
        category: values.category,
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
      ...interiorProduct,
      maintenanceInstructions: interiorProduct.maintenanceInstructions.map(
        (instruction) => ({
          ...instruction,
          dueOn: instruction.dueOn.toISOString(),
          interiorProductId: instruction.interiorProductId ?? null,
          exteriorProductId: instruction.interiorProductId ?? null,
        })
      ),
      installers: interiorProduct.installers.map((installer) => ({
        ...installer,
        interiorProducts: [], // Provide default or empty values
        exteriorProducts: [], // Provide default or empty values
      })),
      site: {
        ...interiorProduct.site,
        createdAt: interiorProduct.site.createdAt.toISOString(),
        updatedAt: interiorProduct.site.updatedAt.toISOString(),
        buildStart: interiorProduct.site.buildStart.toISOString(),
        interiorProducts: [],
        exteriorProducts: [],
      },
    }
  } catch (error) {
    console.error('Error updating interior product:', error)
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
    const product = await editInteriorProduct(siteId, productId, values)

    if (product) {
      return NextResponse.json(product, { status: 200 })
    } else {
      return NextResponse.json(
        { error: 'failed to edit interior product' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error handling request:', error)
    return NextResponse.json(
      { error: 'Failed to edit interior product' },
      { status: 500 }
    )
  }
}
