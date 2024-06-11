import React, { PropsWithChildren } from 'react'
import Navbar from '@/components/Navbar'

const layout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <div>
        <Navbar />
      </div>
      <div className="py-16 px-4 sm:px-8 lg:px-16">{children}</div>
    </main>
  )
}

export default layout
