'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { InteriorProduct } from '@/utils/types'
import { Card } from '@/components/ui/card'
import InteriorCard from '@/components/InteriorCard'

const fetchInteriorProducts = async (
  siteId: string
): Promise<InteriorProduct[]> => {
  const res = await fetch(`/api/sites/${siteId}/interior`)
  if (!res.ok) {
    throw new Error('Failed to fetch interior products')
  }
  return res.json()
}

const Interior = () => {
  const { id } = useParams()

  const { data, isLoading, error } = useQuery<InteriorProduct[]>({
    queryKey: ['interiorProducts', id],
    queryFn: () => fetchInteriorProducts(id as string),
    enabled: !!id,
  })

  if (isLoading) {
    return <div className="flex justify-center items-center">Loading...</div>
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        Error loading interior products
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-center mb-10 text-4xl">Interior</h1>
      <div>
        <div className="grid grid-cols-4 text-2xl text-center mb-4">
          <h1>Product</h1>
          <h1>Supplier</h1>
          <h1>Installer</h1>
          <h1>Instructions</h1>
        </div>
        {data?.map((product) => (
          <Card key={product.id} className="mb-4 bg-primary">
            <InteriorCard product={product} />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Interior
