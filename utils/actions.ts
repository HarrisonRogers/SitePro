'use server'

import prisma from './db'
import { auth } from '@clerk/nextjs/server'
import {
  Site,
  InteriorProduct,
  ExteriorProduct,
  MaintenanceInstruction,
  Installer,
} from './types'
import { redirect } from 'next/navigation'
import { Prisma } from '@prisma/client'

// If user isn't signed in redirect to sign in page
function authenticateAndRedirect(): string {
  const { userId } = auth()
  if (!userId) {
    redirect('/')
  }
  return userId
}

export async function getAllSites() {
  try {
    const sites = await prisma.site.findMany()
    return sites
  } catch (error) {
    console.error('Error fetching sites:', error)
    throw error
  }
}
