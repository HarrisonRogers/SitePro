import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const exterior = () => {
  return (
    <div>
      <h1 className="text-4xl">Exterior</h1>
      <Button asChild>
        <Link href={'/interior'}>Interior</Link>
      </Button>
      <Button asChild>
        <Link href={'/exterior'}>Sites</Link>
      </Button>
    </div>
  )
}

export default exterior
