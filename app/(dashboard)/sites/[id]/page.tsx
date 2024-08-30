'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import SingleSiteCard from '@/components/SingleSiteCard'
import { Card } from '@/components/ui/card'
import { fetchSingleSite } from '@/utils/actions'
import AssignToHouse from '@/components/AssignToHouse'
import { useCheckRole } from '@/utils/roles'

const SitePage = () => {
  const params = useParams()
  const { id } = params
  const isClient = useCheckRole('client')

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
      {!isClient ? (
        <>
          <div className="mt-20 flex flex-col items-center justify-center">
            <div className="inline-block px-6 pb-2 border-b-2 border-gray-100">
              <h1 className="text-3xl text-black text-center">
                Assign User to House
              </h1>
            </div>
          </div>
          <AssignToHouse
            siteId={String(id)}
            siteRef={String(data?.jobReference)}
          />
        </>
      ) : null}
    </div>
  )
}

export default SitePage
