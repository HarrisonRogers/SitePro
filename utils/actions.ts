import prisma from './db'
import { CreateProduct, CreateSite, InteriorProduct, Site } from './types'

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

// Create Site
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

// Delete function
export async function deleteSiteAction(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/sites/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error('Failed to delete site')
    }

    return true
  } catch (error) {
    console.error('Error deleting site:', error)
    return false
  }
}

// Create Interior product

export async function createInteriorProduct(
  values: CreateProduct,
  siteId: string
): Promise<any> {
  try {
    const res = await fetch(
      `/api/sites/${siteId}/interior/add-interior-product`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values, siteId }),
      }
    )

    if (!res.ok) {
      throw new Error('Failed to create interior product')
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error creating interior product:', error)
    throw error
  }
}

// Create Exterior Product
export async function createExteriorProduct(
  values: CreateProduct,
  siteId: string
): Promise<any> {
  try {
    const res = await fetch(
      `/api/sites/${siteId}/exterior/add-exterior-product`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values, siteId }),
      }
    )

    if (!res.ok) {
      throw new Error('Failed to create exterior product')
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error creating exterior product:', error)
    throw error
  }
}
