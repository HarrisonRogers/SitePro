import { NextResponse } from 'next/server'
import prisma from '@/utils/db'

// Get site info
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  try {
    const singleSite = await prisma.site.findUnique({
      where: { id: id },
      include: {
        userSites: true,
      },
    })

    if (!singleSite) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }
    return NextResponse.json(singleSite)
  } catch (error) {
    console.error('Error fetching single site:', error)
    return NextResponse.json(
      { error: 'Error fetching single site' },
      { status: 500 }
    )
  }
}

// Delete Site info
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const siteExists = await prisma.site.findUnique({
      where: { id },
    })
    if (!siteExists) {
      console.log(`Site with id ${id} does not exist.`)
      return new Error('Site does not exist')
    }

    // Delete related InteriorProducts
    await prisma.interiorProduct.deleteMany({
      where: { siteId: id },
    })

    // Delete related ExteriorProducts
    await prisma.exteriorProduct.deleteMany({
      where: { siteId: id },
    })

    const deleteSite = await prisma.site.delete({
      where: {
        id: id,
      },
    })

    return NextResponse.json(deleteSite, { status: 200 })
  } catch (error) {
    console.error('Error deleting site:', error)
    return NextResponse.json(
      { error: 'Falied to delete site' },
      { status: 500 }
    )
  }
}
