'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import SingleSiteCard from '@/components/SingleSiteCard'
import { Card } from '@/components/ui/card'
import { fetchSingleSite } from '@/utils/actions'

const SitePage = () => {
  const params = useParams()
  const { id } = params

  const { data, isLoading, error } = useQuery({
    queryKey: ['singleSite', id],
    queryFn: () => fetchSingleSite(String(id)),
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
