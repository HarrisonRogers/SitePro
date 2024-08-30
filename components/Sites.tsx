'use client'
import React from 'react'
import { Card } from '@/components/ui/card'
import SiteCard from './SiteCard'
import { useQuery } from '@tanstack/react-query'
import { Site } from '@/utils/types'
import AddSiteButton from './AddSiteButton'
import { useCheckRole } from '@/utils/roles'
import { useUser } from '@clerk/nextjs'

const fetchSites = async (): Promise<Site[]> => {
  const response = await fetch('/api/sites')
  if (!response.ok) {
    throw new Error('Failed to fetch sites')
  }
  return response.json()
}

const Sites = () => {
  const isClient = useCheckRole('client')
  const user = useUser()
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

  const userId = user.user?.id
  const userSiteId = data?.map((site) =>
    site.userSites.map((user) => user.userId)
  )

  const assignedSites = data?.filter((site) =>
    site.userSites.some((userSite) => userSite.userId === userId)
  )

  const sitesToDisplay = isClient ? assignedSites : data

  // Check if user has assigned site
  const hasAssignedSite = assignedSites && assignedSites.length > 0

  return isClient && !hasAssignedSite ? (
    <div>
      <h1 className="text-4xl flex justify-center mb-6">
        Waiting To Be Assigned Site...
      </h1>
    </div>
  ) : (
    <div>
      <h1 className="text-4xl flex justify-center mb-6">Select Site</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sitesToDisplay?.map((site) => (
          <Card key={site.id} className="flex flex-col h-64">
            <SiteCard site={site} />
          </Card>
        ))}
        {!isClient ? (
          <Card className="flex flex-col h-64">
            <AddSiteButton />
          </Card>
        ) : null}
      </div>
    </div>
  )
}

export default Sites
