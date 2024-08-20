'use server'

import { clerkClient } from '@clerk/nextjs/server'
import { Roles } from '@/utils/globals'
import { auth } from '@clerk/nextjs/server'

const checkRole = (role: Roles) => {
  const { sessionClaims } = auth()

  return sessionClaims?.metadata.role === role
}

export async function setRole(formData: FormData) {
  if (!checkRole('admin')) {
    return { message: 'Not Authorized' }
  }

  try {
    const res = await clerkClient.users.updateUser(
      formData.get('id') as string,
      {
        publicMetadata: { role: formData.get('role') },
      }
    )

    return { message: res.publicMetadata }
  } catch (error) {
    return { message: error }
  }
}
