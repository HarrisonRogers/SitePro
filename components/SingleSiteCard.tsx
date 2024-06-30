import { Site } from '@/utils/types'
import React from 'react'

function SingleSiteCard({ site }: { site: Site | undefined }) {
  return (
    <div>
      <h1>{site?.jobReference}</h1>
    </div>
  )
}

export default SingleSiteCard
