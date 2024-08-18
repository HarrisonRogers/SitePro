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
  id: string
  name: string
  supplier: string
  category: string
  siteId: string
  site: Site
  maintenanceInstructions: MaintenanceInstruction[]
  installers: Installer[]
}

export type ExteriorProduct = {
  id: string
  name: string
  supplier: string
  category: string
  siteId: string
  site: Site
  maintenanceInstructions: MaintenanceInstruction[]
  installers: Installer[]
}

export type MaintenanceInstruction = {
  id: string
  actionRequired: string
  frequency: string
  dueOn: string // Change to string if you convert dates to ISO strings
  interiorProductId?: string | null
  interiorProduct?: InteriorProduct
  exteriorProductId?: string | null
  exteriorProduct?: ExteriorProduct
}

export type Installer = {
  id: string
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

// Create a new Product
export type CreateProduct = {
  name: string
  supplier: string
  category: string
  maintenanceInstructions: CreateInstructions[]
  installers: CreateInstaller[]
}

export type CreateInstructions = {
  actionRequired: string
  frequency: string
  dueOn: string
}

export type CreateInstaller = {
  name: string
  contact: string
}

// Clerk admin
