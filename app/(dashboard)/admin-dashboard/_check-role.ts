import { Roles } from '@/utils/globals'
import { auth } from '@clerk/nextjs/server'

const checkRole = (role: Roles) => {
  const { sessionClaims } = auth()

  return sessionClaims?.metadata.role === role
}

export default checkRole
