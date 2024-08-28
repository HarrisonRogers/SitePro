import { clerkClient } from '@clerk/nextjs/server'
import { auth } from '@clerk/nextjs/server'

export async function assogmRoleOnSignUp() {
  const { userId } = auth()

  if (userId) {
    const user = await clerkClient.users.getUser(userId)
    const role = user.publicMetadata.role

    if (!role) {
      await clerkClient.users.updateUser(userId, {
        publicMetadata: { role: 'client' },
      })
    }
  }
}
