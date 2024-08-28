export {}

// Roles Type
export type Roles = 'admin' | 'moderator' | 'client'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: 'admin' | 'moderator' | 'client'
    }
  }
}
