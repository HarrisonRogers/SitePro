'use server'

import { clerkClient } from '@clerk/nextjs/server'
import checkRole from './_check-role'

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
