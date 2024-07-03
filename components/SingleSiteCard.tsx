import { Site } from '@/utils/types'
import React from 'react'

function openMap(address: string) {
  const isApple =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MediaStream
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0

  let url = ''
  if (address) {
    url =
      isApple || isMac
        ? `http://maps.apple.com/?q=${encodeURIComponent(address)}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            address
          )}`

    window.open(url, '_blank')
  }
}

function SingleSiteCard({ site }: { site: Site | undefined }) {
  const handleOpenMap = () => {
    if (site?.siteAddress) {
      openMap(site.siteAddress)
    } else {
      console.error('No Site address available')
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center pb-2 mb-10">
        <div className="inline-block px-6 pb-2 border-b-2 border-primary">
          <h1 className="text-4xl">
            {site?.jobReference || 'No available site reference'}
          </h1>
        </div>
        <p className="text-gray-500 text-sm pt-2">{site?.owners}</p>
      </div>
      <p>{site?.buildComplete ? 'Build Complete' : 'Build Incomplete'}</p>
      <p>Build Start: {site?.buildStart}</p>
      <p>Address: {site?.siteAddress}</p>
      {site?.siteAddress && (
        <button
          onClick={handleOpenMap}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Open in maps
        </button>
      )}
    </div>
  )
}

export default SingleSiteCard
