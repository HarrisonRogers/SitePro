'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { ExteriorProduct } from '@/utils/types'
import { Card } from '@/components/ui/card'
import ExteriorCard from '@/components/ExteriorCard'

const fetchExteriorProducts = async (
  siteId: string
): Promise<ExteriorProduct[]> => {
  const res = await fetch(`/api/sites/${siteId}/exterior`)
  if (!res.ok) {
    throw new Error('Failed to fetch exterior products')
  }
  return res.json()
}

const Exterior = () => {
  const { id } = useParams()

  const { data, isLoading, error } = useQuery<ExteriorProduct[]>({
    queryKey: ['exteriorProducts', id],
    queryFn: () => fetchExteriorProducts(id as string),
    enabled: !!id,
  })

  if (isLoading) {
    return <div className="flex justify-center items-center">Loading...</div>
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        Error loading exterior products
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-center items-center pb-2 mb-10">
        <h1 className="text-6xl inline-block px-6 pb-2 border-b-2">Exterior</h1>
      </div>
      <div>
        <div className="grid grid-cols-4 text-2xl text-center mb-4">
          <h1>Product</h1>
          <h1>Supplier</h1>
          <h1>Installer</h1>
          <h1>Instructions</h1>
        </div>
        {data?.map((product) => (
          <Card key={product.id} className="mb-4 bg-primary">
            <ExteriorCard product={product} />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Exterior
