import prisma from '@/utils/db'
import { CreateProduct, ExteriorProduct } from '@/utils/types'
import { NextRequest, NextResponse } from 'next/server'

// Create exterior product function
export async function createExteriorProductAction(
  values: CreateProduct,
  siteId: string
): Promise<ExteriorProduct | null> {
  try {
    const exteriorProduct = await prisma.exteriorProduct.create({
      data: {
        name: values.name,
        supplier: values.supplier,
        category: values.category,
        siteId: siteId,
        maintenanceInstructions: {
          create: values.maintenanceInstructions.map((instruction) => ({
            actionRequired: instruction.actionRequired,
            frequency: instruction.frequency,
            dueOn: new Date(instruction.dueOn), // Convert string to Date
          })),
        },
        installers: {
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

    // Convert Dates to strings and ensure all required fields are present
    const formattedExteriorProduct: ExteriorProduct = {
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
        interiorProducts: [],
        exteriorProducts: [],
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

    return formattedExteriorProduct
  } catch (error) {
    console.error('Error creating exterior product:', error)
    return null
  }
}

// API route
export async function POST(req: NextRequest) {
  try {
    const { values, siteId }: { values: CreateProduct; siteId: string } =
      await req.json()
    const product = await createExteriorProductAction(values, siteId)

    if (product) {
      return NextResponse.json(product, { status: 200 })
    } else {
      return NextResponse.json(
        { error: 'failed to create interior product' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error handling request:', error)
    return NextResponse.json(
      { error: 'Failed to create interior product' },
      { status: 500 }
    )
  }
}
