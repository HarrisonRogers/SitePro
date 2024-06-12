import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import SiteCard from './SiteCard'

type SiteTypes = {
  id: number
  jobReference: string
  siteAddress: string
  owners: string
  buildStart: string
  buildComplete: boolean
  interiorProducts: Product[]
  exteriorProducts: Product[]
}

type Product = {
  name: string
  quantity: number
}

const Sites = () => {
  const sites: SiteTypes[] = [
    {
      id: 1,
      jobReference: 'My Home',
      siteAddress: '9 millers terrace',
      owners: 'Rogers',
      buildStart: '30/02/2017',
      buildComplete: false,
      interiorProducts: [
        { name: 'Paint', quantity: 10 },
        { name: 'Tiles', quantity: 50 },
      ],
      exteriorProducts: [
        { name: 'Bricks', quantity: 500 },
        { name: 'Cement', quantity: 20 },
      ],
    },
    {
      id: 2,
      jobReference: 'Harrisons Home',
      siteAddress: '167 ajhfe lane',
      owners: 'Beans',
      buildStart: '12/02/2022',
      buildComplete: true,
      interiorProducts: [
        { name: 'Carpet', quantity: 30 },
        { name: 'Lights', quantity: 15 },
      ],
      exteriorProducts: [
        { name: 'Wood Panels', quantity: 40 },
        { name: 'Paint', quantity: 25 },
      ],
    },
    {
      id: 3,
      jobReference: 'feffeaPool',
      siteAddress: 'uafhieafa harrison express',
      owners: 'Palacio',
      buildStart: '30/02/2000',
      buildComplete: false,
      interiorProducts: [
        { name: 'Wall Paint', quantity: 12 },
        { name: 'Ceiling Tiles', quantity: 30 },
      ],
      exteriorProducts: [
        { name: 'Concrete', quantity: 60 },
        { name: 'Garden Soil', quantity: 15 },
      ],
    },
    {
      id: 4,
      jobReference: 'Brick house',
      siteAddress: '20 crighton avenue',
      owners: 'Silvas',
      buildStart: '16/11/2015',
      buildComplete: false,
      interiorProducts: [
        { name: 'Kitchen Cabinets', quantity: 8 },
        { name: 'Bathroom Fixtures', quantity: 6 },
      ],
      exteriorProducts: [
        { name: 'Roof Shingles', quantity: 500 },
        { name: 'Fencing', quantity: 20 },
      ],
    },
  ]

  return (
    <div>
      <h1 className="text-4xl flex justify-center mb-6">Select Site</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sites.map((site: SiteTypes) => (
          <Card key={site.id} className="flex flex-col">
            <SiteCard site={site} />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Sites
