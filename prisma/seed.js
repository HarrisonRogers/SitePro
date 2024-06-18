const { PrismaClient } = require('@prisma/client')
const data = require('./mock-data.json')
const prisma = new PrismaClient()

async function main() {
  for (const site of data) {
    const { interiorProducts, exteriorProducts, ...siteData } = site

    const createdSite = await prisma.site.create({
      data: {
        ...siteData,
        interiorProducts: {
          create: interiorProducts.map((product) => ({
            ...product,
            maintenanceInstructions: {
              create: product.maintenanceInstructions,
            },
            installers: {
              connectOrCreate: product.installers.map((installer) => ({
                where: { id: installer.id },
                create: installer,
              })),
            },
          })),
        },
        exteriorProducts: {
          create: exteriorProducts.map((product) => ({
            ...product,
            maintenanceInstructions: {
              create: product.maintenanceInstructions,
            },
            installers: {
              connectOrCreate: product.installers.map((installer) => ({
                where: { id: installer.id },
                create: installer,
              })),
            },
          })),
        },
      },
    })

    // Ensure circular references are properly handled if required
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
