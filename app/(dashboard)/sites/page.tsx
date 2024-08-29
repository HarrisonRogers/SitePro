import React from 'react'
import Sites from '@/components/Sites'
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query'

const sites = () => {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Sites />
    </HydrationBoundary>
  )
}

export default sites
