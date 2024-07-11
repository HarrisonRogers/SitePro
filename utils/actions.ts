import prisma from './db'
import { CreateSite, Site } from './types'

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

    return plainSites as Site[]
  } catch (error) {
    console.error('Error fetching sites:', error)
    throw error
  }
}

// // Create a Site
// export async function createSiteAction(
//   values: CreateSite
// ): Promise<CreateSite | null> {
//   try {
//     const site = await prisma.site.create({
//       data: {
//         ...values,
//         buildStart: new Date(values.buildStart),
//       },
//     })

//     // convert dates to strings
//     const formattedSites: CreateSite = {
//       ...site,
//       buildStart: site.buildStart.toISOString(),
//     }

//     return formattedSites
//   } catch (error) {
//     console.error('Error creating site:', error)
//     return null
//   }
// }

// Create a Site
// export async function createSiteAction(
//   values: CreateSite
// ): Promise<Site | null> {
//   try {
//     const site = await prisma.site.create({
//       data: {
//         ...values,
//         buildStart: new Date(values.buildStart), // Convert string to Date
//       },
//     })

//     // Convert Dates to strings
//     const formattedSite: Site = {
//       ...site,
//       createdAt: site.createdAt.toISOString(),
//       updatedAt: site.updatedAt.toISOString(),
//       buildStart: site.buildStart.toISOString(),
//       interiorProducts: [],
//       exteriorProducts: [],
//     }

//     return formattedSite
//   } catch (error) {
//     console.error('Error creating site:', error)
//     return null
//   }
// }

export async function createSiteAction(
  values: CreateSite
): Promise<Site | null> {
  try {
    const response = await fetch('/api/sites/add-site', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (!response.ok) {
      throw new Error('Failed to create site')
    }

    const site: Site = await response.json()
    return site
  } catch (error) {
    console.error('Error creating site:', error)
    return null
  }
}
