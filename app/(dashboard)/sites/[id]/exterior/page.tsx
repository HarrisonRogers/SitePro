'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { ExteriorProduct } from '@/utils/types'
import { Card } from '@/components/ui/card'
import ExteriorCard from '@/components/ExteriorCard'
import AddProductButton from '@/components/AddProductButton'
import DeleteProductButton from '@/components/DeleteProductButton'
import EditProductButton from '@/components/EditProductButton'
import FilterProducts from '@/components/FilterProducts'
import { useCheckRole } from '@/utils/roles'

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
  const isAdmin = useCheckRole('admin')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { data, isLoading, error } = useQuery<ExteriorProduct[]>({
    queryKey: ['exteriorProducts', id],
    queryFn: () => fetchExteriorProducts(id as string),
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
        Error loading exterior products
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center pb-2 mb-10">
        <h1 className="text-6xl inline-block px-6 pb-2 border-b-2 mb-5">
          Exterior
        </h1>
        <FilterProducts
          type={'exterior'}
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
              {isAdmin ? (
                <div className="absolute">
                  <DeleteProductButton
                    type="exterior"
                    id={product.id}
                    product={product.name}
                  />
                  <EditProductButton id={product.id} type="exterior" />
                </div>
              ) : null}

              <ExteriorCard product={product} />
            </Card>
          ))}
          <AddProductButton />
        </div>
      ) : (
        <h3 className="text-center">
          <AddProductButton />
        </h3>
      )}
    </div>
  )
}

export default Exterior
