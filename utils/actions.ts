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
        userSites: true,
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

// Fetch single site
export async function fetchSingleSite(id: string): Promise<Site> {
  const res = await fetch(`/api/sites/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch site')
  }
  return res.json()
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

// Update site
export async function updateSiteAction(id: string, values: CreateSite) {
  try {
    const res = await fetch(`/api/sites/${id}/edit`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values, id }),
    })

    if (!res.ok) {
      throw new Error('Failed to edit site')
    }

    return true
  } catch (error) {
    console.error('Error editing site:', error)
    return false
  }
}

// Delete site function
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

// Delete interior product action
export async function deleteInteriorProductAction(
  siteId: string,
  productId: string
) {
  try {
    const res = await fetch(`/api/sites/${siteId}/interior`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: productId }),
    })

    if (!res.ok) {
      throw new Error('Failed to delete interior product')
    }

    return true
  } catch (error) {
    console.error('Failed to delete interior product:', error)
    return false
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

// Delete exterior product action
export async function deleteExteriorProductAction(
  siteId: string,
  productId: string
) {
  try {
    const res = await fetch(`/api/sites/${siteId}/exterior`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: productId }),
    })

    if (!res.ok) {
      throw new Error('Failed to delete exterior product')
    }

    return true
  } catch (error) {
    console.error('Failed to delete exterior product:', error)
    return false
  }
}

export async function getProductAction(
  siteId: string,
  productId: string,
  type: 'interior' | 'exterior'
) {
  try {
    const res = await fetch(`/api/sites/${siteId}/${type}/${productId}`)
    if (!res.ok) {
      throw new Error(`failed to fetch ${type} product ${productId}`)
    }
    return res.json()
  } catch (error) {
    console.error('Failed to fetch exterior product', error)
    return null
  }
}

// Edit product
export async function editProductAction(
  siteId: string,
  productId: string,
  type: 'interior' | 'exterior',
  values: CreateProduct
) {
  try {
    const res = await fetch(`/api/sites/${siteId}/${type}/${productId}/edit`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values, productId }),
    })

    if (!res.ok) {
      throw new Error('Failed to edit exterior product')
    }

    return true
  } catch (error) {
    console.error('Failed to delete exterior product:', error)
    return false
  }
}

// Get Users
export async function fetchUsersAction(siteId: string) {
  try {
    const res = await fetch(`/api/sites/${siteId}/users`)
    if (!res.ok) {
      throw new Error('failed to fetch users')
    }
    return res.json()
  } catch (error) {
    console.error('Failed to fetch exterior product', error)
    return null
  }
}

// AssignUserToHouse
export async function assignUserToHouseAction(userId: string, siteId: string) {
  try {
    const res = await fetch(`/api/sites/${siteId}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, siteId }),
    })

    if (!res.ok) {
      throw new Error('Failed to assign user to site')
    }

    const data = await res.json()
    console.log(data)
    return data
  } catch (error) {
    console.error('Error assigning user to site:', error)
    throw error
  }
}

// Unassign user to house
export async function unassignUserFromSiteAction(
  siteId: string,
  userId: string
) {
  try {
    const res = await fetch(`/api/sites/${siteId}/users/${userId}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error('Failed to unassign user from site')
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error unassigning user from site', error)
    throw error
  }
}
