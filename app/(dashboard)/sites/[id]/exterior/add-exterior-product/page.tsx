import CreateProductForm from '@/components/CreateProductForm'
import React from 'react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

const addExteriorProduct = () => {
  const queryClient = new QueryClient()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateProductForm type="exterior" />
    </HydrationBoundary>
  )
}

export default addExteriorProduct
