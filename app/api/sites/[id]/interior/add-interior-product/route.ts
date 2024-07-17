import prisma from '@/utils/db'
import { CreateProduct, InteriorProduct } from '@/utils/types'
import { NextRequest, NextResponse } from 'next/server'

// Create Interior product function
export async function createInteriorProductAction(
  values: CreateProduct,
  siteId: string
): Promise<InteriorProduct | null> {
  try {
    const interiorProduct = await prisma.interiorProduct.create({
      data: {
        name: values.name,
        supplier: values.supplier,
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
    const formattedInteriorProduct: InteriorProduct = {
      ...interiorProduct,
      maintenanceInstructions: interiorProduct.maintenanceInstructions.map(
        (instruction) => ({
          ...instruction,
          dueOn: instruction.dueOn.toISOString(),
          interiorProductId: instruction.interiorProductId ?? null,
          exteriorProductId: instruction.exteriorProductId ?? null,
        })
      ),
      installers: interiorProduct.installers.map((installer) => ({
        ...installer,
        interiorProducts: [],
        exteriorProducts: [],
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

    return formattedInteriorProduct
  } catch (error) {
    console.error('Error creating interior product:', error)
    return null
  }
}

// API route
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
    console.error('Error handling request:', error)
    return NextResponse.json(
      { error: 'Failed to create interior product' },
      { status: 500 }
    )
  }
}
