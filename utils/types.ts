export type Site = {
  id: string
  createdAt: Date
  updatedAt: Date
  jobReference: string
  siteAddress: string
  owners: string
  buildStart: string
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
  dueOn: Date
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
