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
import { useQuery } from '@tanstack/react-query'
import { getAllSites } from '@/utils/actions'
import { Site } from '@/utils/types'

const Sites = () => {
  const { data, isPending } = useQuery({
    queryKey: ['sites'],
    queryFn: () => getAllSites(),
  })

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
