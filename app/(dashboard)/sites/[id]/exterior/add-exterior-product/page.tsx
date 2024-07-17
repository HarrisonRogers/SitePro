import CreateProductForm from '@/components/CreateProductForm'
import React from 'react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

const addSite = () => {
  const queryClient = new QueryClient()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateProductForm />
    </HydrationBoundary>
  )
}

export default addSite
