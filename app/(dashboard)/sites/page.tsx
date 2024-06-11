import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const sites = () => {
  return (
    <div>
      <h1 className="text-4xl">Site</h1>
      <Button asChild>
        <Link href={'/interior'}>Interior</Link>
      </Button>
      <Button asChild>
        <Link href={'/exterior'}>Exterior</Link>
      </Button>
    </div>
  )
}

export default sites
