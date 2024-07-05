import React, { PropsWithChildren } from 'react'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/BackButton'

const layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="bg-background">
      <div>
        <Navbar />
      </div>
      <div className="py-16 px-4 sm:px-8 lg:px-16">
        {children}
        <BackButton />
      </div>
    </main>
  )
}

export default layout
