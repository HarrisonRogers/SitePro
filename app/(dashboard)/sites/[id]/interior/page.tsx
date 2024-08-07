'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { InteriorProduct } from '@/utils/types'
import { Card } from '@/components/ui/card'
import InteriorCard from '@/components/InteriorCard'
import AddProductButton from '@/components/AddProductButton'
import DeleteProductButton from '@/components/DeleteProductButton'
import EditProductButton from '@/components/EditProductButton'
import FilterProducts from '@/components/FilterProducts'

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { data, isLoading, error } = useQuery<InteriorProduct[]>({
    queryKey: ['interiorProducts', id],
    queryFn: () => fetchInteriorProducts(id as string),
    enabled: !!id,
  })

  const filteredProduct =
    selectedCategory !== 'All Categories'
      ? data?.filter((product) => product.category === selectedCategory)
      : data

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
      <div className="flex flex-col justify-center items-center pb-2 mb-10">
        <h1 className="text-6xl inline-block px-6 pb-2 border-b-2 mb-5">
          Interior
        </h1>
        <FilterProducts
          type={'interior'}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      {filteredProduct && filteredProduct.length > 0 ? (
        <div>
          <div className="grid grid-cols-4 text-2xl text-center mb-4">
            <h1>Product</h1>
            <h1>Supplier</h1>
            <h1>Installer</h1>
            <h1>Instructions</h1>
          </div>
          {filteredProduct?.map((product) => (
            <Card key={product.id} className="mb-4 bg-primary">
              <div className="absolute">
                <DeleteProductButton
                  type="interior"
                  id={product.id}
                  product={product.name}
                />
                <EditProductButton type="interior" id={product.id} />
              </div>

              <InteriorCard product={product} />
            </Card>
          ))}
          <AddProductButton />
        </div>
      ) : (
        <div>
          <AddProductButton />
        </div>
      )}
    </div>
  )
}

export default Interior
