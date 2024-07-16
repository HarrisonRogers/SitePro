import CreateSiteForm from '@/components/CreateSiteForm'
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
      <CreateSiteForm />
    </HydrationBoundary>
  )
}

export default addSite
