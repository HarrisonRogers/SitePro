const { PrismaClient } = require('@prisma/client')
const data = require('./mock-data.json')
const prisma = new PrismaClient()

async function main() {
  for (const site of data) {
    const { interiorProducts, exteriorProducts, ...siteData } = site

    await prisma.site.create({
      data: {
        ...siteData,
        createdAt: new Date(siteData.createdAt),
        updatedAt: new Date(siteData.updatedAt),
        buildStart: new Date(siteData.buildStart),
        interiorProducts: {
          create: interiorProducts.map((product) => ({
            name: product.name,
            supplier: product.supplier,
            maintenanceInstructions: {
              create: product.maintenanceInstructions.map((instruction) => ({
                actionRequired: instruction.actionRequired,
                frequency: instruction.frequency,
                dueOn: new Date(instruction.dueOn),
              })),
            },
            installers: {
              connectOrCreate: product.installers.map((installer) => ({
                where: { id: installer.id },
                create: {
                  id: installer.id,
                  name: installer.name,
                  contact: installer.contact,
                },
              })),
            },
          })),
        },
        exteriorProducts: {
          create: exteriorProducts.map((product) => ({
            name: product.name,
            supplier: product.supplier,
            maintenanceInstructions: {
              create: product.maintenanceInstructions.map((instruction) => ({
                actionRequired: instruction.actionRequired,
                frequency: instruction.frequency,
                dueOn: new Date(instruction.dueOn),
              })),
            },
            installers: {
              connectOrCreate: product.installers.map((installer) => ({
                where: { id: installer.id },
                create: {
                  id: installer.id,
                  name: installer.name,
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
    console.log('Seeding completed successfully.')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
