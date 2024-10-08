'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { ExteriorProduct } from '@/utils/types'
import { Card } from '@/components/ui/card'
import AddProductButton from '@/components/AddProductButton'
import DeleteProductButton from '@/components/DeleteProductButton'
import EditProductButton from '@/components/EditProductButton'
import FilterProducts from '@/components/FilterProducts'
import { useCheckRole } from '@/utils/roles'
import ProductCard from '@/components/ProductCard'

const fetchProducts = async (
  siteId: string,
  type: string
): Promise<ExteriorProduct[]> => {
  const res = await fetch(`/api/sites/${siteId}/${type}`)
  if (!res.ok) {
    throw new Error('Failed to fetch exterior products')
  }
  return res.json()
}

const Products = ({ type }: { type: 'exterior' | 'interior' }) => {
  const { id } = useParams()
  const isAdmin = useCheckRole('admin')
  const isMod = useCheckRole('moderator')
  const isClient = useCheckRole('client')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'All Categories'
  )

  const { data, isLoading, error } = useQuery<ExteriorProduct[]>({
    queryKey: [`${type}Products`, id],
    queryFn: () => fetchProducts(id as string, type),
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
        Error loading {type} products
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center pb-2 mb-10">
        <h1 className="text-6xl inline-block px-6 pb-2 border-b-2 mb-5">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </h1>
        <FilterProducts
          type={type}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      {filteredProduct && filteredProduct.length > 0 ? (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 text-lg md:text-2xl text-center mb-4">
            <h1>Product</h1>
            <h1 className="hidden md:block">Supplier</h1>
            <h1 className="hidden md:block">Installer</h1>
            <h1>Instructions</h1>
          </div>
          {filteredProduct?.map((product) => (
            <Card key={product.id} className="mb-4 bg-primary relative">
              {isAdmin || isMod ? (
                <div className="absolute top-0 left-0 flex flex-col p-1 md:p-2 space-y-5 space-x-0 md:space-y-3 md:space-x-0">
                  {!isMod && (
                    <DeleteProductButton
                      type={type}
                      id={product.id}
                      product={product.name}
                    />
                  )}
                  <EditProductButton id={product.id} type={type} />
                </div>
              ) : null}

              <ProductCard product={product} />
            </Card>
          ))}
          {isAdmin || isMod ? <AddProductButton /> : null}
        </div>
      ) : (
        <div>
          {isAdmin || isMod ? (
            <h3 className="text-center">
              <AddProductButton />
            </h3>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Products
