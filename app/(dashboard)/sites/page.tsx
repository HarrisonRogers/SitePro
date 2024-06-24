import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
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
