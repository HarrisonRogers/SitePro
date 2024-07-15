import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { CreateSite, Site } from '@/utils/types'

const prisma = new PrismaClient()

async function createSiteAction(values: CreateSite): Promise<Site | null> {
  try {
    const site = await prisma.site.create({
      data: {
        jobReference: values.jobReference,
        owners: values.owners,
        siteAddress: values.siteAddress,
        buildComplete: values.buildComplete,
        buildStart: new Date(values.buildStart), // Convert string to Date
      },
    })

    // Convert Dates to strings
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
    console.error('Error creating site:', error)
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const values: CreateSite = await req.json()
    const site = await createSiteAction(values)

    if (site) {
      return NextResponse.json(site, { status: 200 })
    } else {
      return NextResponse.json(
        { error: 'Failed to create site' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error handling request:', error)
    return NextResponse.json(
      { error: 'Failed to create site' },
      { status: 500 }
    )
  }
}
