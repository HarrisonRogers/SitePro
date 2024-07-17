import CreateProductForm from '@/components/CreateProductForm'
import React from 'react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

const addInteriorProduct = () => {
  const queryClient = new QueryClient()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateProductForm type="interior" />
    </HydrationBoundary>
  )
}

export default addInteriorProduct
