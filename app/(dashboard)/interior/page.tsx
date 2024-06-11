import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const interior = () => {
  return (
    <div>
      <h1 className="text-4xl">Interior</h1>
      <Button asChild>
        <Link href={'/sites'}>Sites</Link>
      </Button>
      <Button asChild>
        <Link href={'/exterior'}>Exterior</Link>
      </Button>
    </div>
  )
}

export default interior
