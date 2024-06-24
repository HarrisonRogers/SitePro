import prisma from './db'
import { Site } from './types'

export async function getAllSites(): Promise<Site[]> {
  try {
    console.log('Fetching sites from database...')
    const sites = await prisma.site.findMany({
      include: {
        interiorProducts: {
          include: {
            maintenanceInstructions: true,
            installers: true,
          },
        },
        exteriorProducts: {
          include: {
            maintenanceInstructions: true,
            installers: true,
          },
        },
      },
    })

    console.log('Sites fetched from database:', sites)

    // Convert to plain objects
    const plainSites = sites.map((site) => ({
      ...site,
      createdAt: site.createdAt.toISOString(),
      updatedAt: site.updatedAt.toISOString(),
      buildStart: site.buildStart.toISOString(),
      interiorProducts: site.interiorProducts.map((product) => ({
        ...product,
        maintenanceInstructions: product.maintenanceInstructions.map(
          (instruction) => ({
            ...instruction,
            dueOn: instruction.dueOn.toISOString(),
          })
        ),
        installers: product.installers.map((installer) => ({
          ...installer,
        })),
      })),
      exteriorProducts: site.exteriorProducts.map((product) => ({
        ...product,
        maintenanceInstructions: product.maintenanceInstructions.map(
          (instruction) => ({
            ...instruction,
            dueOn: instruction.dueOn.toISOString(),
          })
        ),
        installers: product.installers.map((installer) => ({
          ...installer,
        })),
      })),
    }))

    console.log('Formatted sites:', plainSites)

    return plainSites as Site[]
  } catch (error) {
    console.error('Error fetching sites:', error)
    throw error
  }
}
