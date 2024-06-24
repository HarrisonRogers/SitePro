import { NextResponse } from 'next/server'
import { getAllSites } from '@/utils/actions'

export async function GET() {
  try {
    const sites = await getAllSites()
    return NextResponse.json(sites)
  } catch (error) {
    console.error('Error fetching sites:', error)
    return NextResponse.json({ error: 'Error fetching sites' }, { status: 500 })
  }
}
