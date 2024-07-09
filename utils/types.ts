// Site action
export type Site = {
  id: string
  createdAt: string // Change to string if you convert dates to ISO strings
  updatedAt: string // Change to string if you convert dates to ISO strings
  jobReference: string
  siteAddress: string
  owners: string
  buildStart: string // Change to string if you convert dates to ISO strings
  buildComplete: boolean
  interiorProducts: InteriorProduct[]
  exteriorProducts: ExteriorProduct[]
}

export type InteriorProduct = {
  id: number
  name: string
  supplier: string
  siteId: string
  site: Site
  maintenanceInstructions: MaintenanceInstruction[]
  installers: Installer[]
}

export type ExteriorProduct = {
  id: number
  name: string
  supplier: string
  siteId: string
  site: Site
  maintenanceInstructions: MaintenanceInstruction[]
  installers: Installer[]
}

export type MaintenanceInstruction = {
  id: number
  actionRequired: string
  frequency: string
  dueOn: string // Change to string if you convert dates to ISO strings
  interiorProductId?: number
  interiorProduct?: InteriorProduct
  exteriorProductId?: number
  exteriorProduct?: ExteriorProduct
}

export type Installer = {
  id: number
  name: string
  contact: string
  interiorProducts: InteriorProduct[]
  exteriorProducts: ExteriorProduct[]
}

// Create a new job
export type CreateSite = {
  jobReference: string
  siteAddress: string
  owners: string
  buildStart: string // Change to string if you convert dates to ISO strings
  buildComplete: boolean
}
