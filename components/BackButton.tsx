'use client'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'
import { MoveLeft } from 'lucide-react'

const BackButton = () => {
  const router = useRouter()
  const params = usePathname()

  return (
    <div className="fixed bottom-4 transform -translate-x-1/2">
      {params !== '/sites' ? (
        <Button onClick={() => router.back()}>
          <MoveLeft />
        </Button>
      ) : (
        ''
      )}
    </div>
  )
}

export default BackButton
