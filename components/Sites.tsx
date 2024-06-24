'use client'
import React, { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import SiteCard from './SiteCard'
import { useQuery } from '@tanstack/react-query'
import { getAllSites } from '@/utils/actions'
import { Site } from '@/utils/types'

const fetchSites = async (): Promise<Site[]> => {
  const response = await fetch('/api/sites')
  if (!response.ok) {
    throw new Error('Failed to fetch sites')
  }
  return response.json()
}

const Sites = () => {
  const { data, isLoading, error } = useQuery<Site[]>({
    queryKey: ['sites'],
    queryFn: fetchSites,
  })

  useEffect(() => {
    console.log('Query Data:', data)
    console.log('Query Error:', error)
  }, [data, error])

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

  return (
    <div>
      <h1 className="text-4xl flex justify-center mb-6">Select Site</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((site) => (
          <Card key={site.id} className="flex flex-col">
            <SiteCard site={site} />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Sites
