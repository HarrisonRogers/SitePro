import prisma from '@/utils/db'
import { CreateSite, Site } from '@/utils/types'
import { NextRequest, NextResponse } from 'next/server'

export async function editSite(
  id: string,
  values: CreateSite
): Promise<Site | null> {
  try {
    const site = await prisma.site.update({
      where: { id: id },
      data: {
        jobReference: values.jobReference,
        owners: values.owners,
        siteAddress: values.siteAddress,
        buildComplete: values.buildComplete,
        buildStart: new Date(values.buildStart), // Convert string to Date
      },
    })

    const formattedSite: Site = {
      ...site,
      createdAt: site.createdAt.toISOString(),
      updatedAt: site.updatedAt.toISOString(),
      buildStart: site.buildStart.toISOString(),
      interiorProducts: [],
      exteriorProducts: [],
    }

    return formattedSite
  } catch (error) {
    console.error('Error updating site:', error)
    return null
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { values, id }: { values: CreateSite; id: string } = await req.json()
    const product = await editSite(id, values)

    if (product) {
      return NextResponse.json(product, { status: 200 })
    } else {
      return NextResponse.json(
        { error: 'failed to edit site' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error handling request:', error)
    return NextResponse.json({ error: 'Failed to edit site' }, { status: 500 })
  }
}
