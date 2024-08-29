'use client'
import React from 'react'
import { Card } from '@/components/ui/card'
import SiteCard from './SiteCard'
import { useQuery } from '@tanstack/react-query'
import { Site } from '@/utils/types'
import AddSiteButton from './AddSiteButton'
import { useCheckRole } from '@/utils/roles'

const fetchSites = async (): Promise<Site[]> => {
  const response = await fetch('/api/sites')
  if (!response.ok) {
    throw new Error('Failed to fetch sites')
  }
  return response.json()
}

const Sites = () => {
  const isClient = useCheckRole('client')
  const { data, isLoading, error } = useQuery<Site[]>({
    queryKey: ['sites'],
    queryFn: fetchSites,
  })

  if (isLoading) {
    return <div className="flex align-center justify-center">Loading...</div>
  }

  if (error) {
    return (
      <div className="flex align-center justify-center">
        Error Loading Sites
      </div>
    )
  }

  return isClient ? (
    <div>
      <h1 className="text-4xl flex justify-center mb-6">
        Waiting To Be Assigned Site...
      </h1>
    </div>
  ) : (
    <div>
      <h1 className="text-4xl flex justify-center mb-6">Select Site</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((site) => (
          <Card key={site.id} className="flex flex-col h-64">
            <SiteCard site={site} />
          </Card>
        ))}
        <Card className="flex flex-col h-64">
          <AddSiteButton />
        </Card>
      </div>
    </div>
  )
}

export default Sites
