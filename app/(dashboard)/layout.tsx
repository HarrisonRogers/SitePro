import React, { PropsWithChildren } from 'react'
import Navbar from '@/components/Navbar'
import BackButton from '@/components/BackButton'
import { assogmRoleOnSignUp } from '@/utils/assignRole'

const layout = ({ children }: PropsWithChildren) => {
  assogmRoleOnSignUp()

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
