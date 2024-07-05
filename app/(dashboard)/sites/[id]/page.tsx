'use client'
import React from 'react'
import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'
import { Site } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'
import SingleSiteCard from '@/components/SingleSiteCard'
import { Card } from '@/components/ui/card'

const SitePage = () => {
  const params = useParams()
  const { id } = params

  const fetchSite = async (): Promise<Site> => {
    const res = await fetch(`/api/sites/${id}`)
    if (!res.ok) {
      throw new Error('Failed to fetch site')
    }
    return res.json()
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['singleSite', id],
    queryFn: fetchSite,
    enabled: !!id,
  })

  if (isLoading) {
    return <div className="flex align-center justify-center">Loading...</div>
  }

  if (error) {
    return (
      <div className="flex align-center justify-center">Error Loading Site</div>
    )
  }

  return (
    <div>
      <Card>
        <SingleSiteCard site={data} />
      </Card>
    </div>
  )
}

export default SitePage
