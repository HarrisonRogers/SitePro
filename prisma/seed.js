const { PrismaClient } = require('@prisma/client')
const { v4: uuidv4 } = require('uuid')
const data = require('./mock-data.json')
const prisma = new PrismaClient()

async function main() {
  for (const site of data) {
    const { interiorProducts, exteriorProducts, ...siteData } = site

    const newSiteId = uuidv4()

    await prisma.site.upsert({
      where: { id: site.id },
      update: {
        ...siteData,
        id: newSiteId,
        createdAt: new Date(siteData.createdAt),
        updatedAt: new Date(siteData.updatedAt),
        buildStart: new Date(siteData.buildStart),
        interiorProducts: {
          create: interiorProducts.map((product) => ({
            id: uuidv4(),
            name: product.name,
            supplier: product.supplier,
            maintenanceInstructions: {
              create: product.maintenanceInstructions.map((instruction) => ({
                id: uuidv4(),
                actionRequired: instruction.actionRequired,
                frequency: instruction.frequency,
                dueOn: new Date(instruction.dueOn),
              })),
            },
            installers: {
              connectOrCreate: product.installers.map((installer) => ({
                where: { name: installer.name }, // Ensure unique constraint is on 'name'
                create: {
                  id: uuidv4(),
                  name: `${installer.name}-${newSiteId}`, // Append site ID to make it unique
                  contact: installer.contact,
                },
              })),
            },
          })),
        },
        exteriorProducts: {
          create: exteriorProducts.map((product) => ({
            id: uuidv4(),
            name: product.name,
            supplier: product.supplier,
            maintenanceInstructions: {
              create: product.maintenanceInstructions.map((instruction) => ({
                id: uuidv4(),
                actionRequired: instruction.actionRequired,
                frequency: instruction.frequency,
                dueOn: new Date(instruction.dueOn),
              })),
            },
            installers: {
              connectOrCreate: product.installers.map((installer) => ({
                where: { name: installer.name }, // Ensure unique constraint is on 'name'
                create: {
                  id: uuidv4(),
                  name: `${installer.name}-${newSiteId}`, // Append site ID to make it unique
                  contact: installer.contact,
                },
              })),
            },
          })),
        },
      },
      create: {
        ...siteData,
        id: newSiteId,
        createdAt: new Date(siteData.createdAt),
        updatedAt: new Date(siteData.updatedAt),
        buildStart: new Date(siteData.buildStart),
        interiorProducts: {
          create: interiorProducts.map((product) => ({
            id: uuidv4(),
            name: product.name,
            supplier: product.supplier,
            maintenanceInstructions: {
              create: product.maintenanceInstructions.map((instruction) => ({
                id: uuidv4(),
                actionRequired: instruction.actionRequired,
                frequency: instruction.frequency,
                dueOn: new Date(instruction.dueOn),
              })),
            },
            installers: {
              connectOrCreate: product.installers.map((installer) => ({
                where: { name: installer.name }, // Ensure unique constraint is on 'name'
                create: {
                  id: uuidv4(),
                  name: `${installer.name}-${newSiteId}`, // Append site ID to make it unique
                  contact: installer.contact,
                },
              })),
            },
          })),
        },
        exteriorProducts: {
          create: exteriorProducts.map((product) => ({
            id: uuidv4(),
            name: product.name,
            supplier: product.supplier,
            maintenanceInstructions: {
              create: product.maintenanceInstructions.map((instruction) => ({
                id: uuidv4(),
                actionRequired: instruction.actionRequired,
                frequency: instruction.frequency,
                dueOn: new Date(instruction.dueOn),
              })),
            },
            installers: {
              connectOrCreate: product.installers.map((installer) => ({
                where: { name: installer.name }, // Ensure unique constraint is on 'name'
                create: {
                  id: uuidv4(),
                  name: `${installer.name}-${newSiteId}`, // Append site ID to make it unique
                  contact: installer.contact,
                },
              })),
            },
          })),
        },
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
