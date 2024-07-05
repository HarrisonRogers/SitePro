import { Site } from '@/utils/types'
import { Check, X } from 'lucide-react'
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
      openMap(site?.siteAddress)
    } else {
      console.error('No Site address available')
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center pb-2 mb-10">
        <div className="inline-block px-6 pb-2 border-b-2 border-primary">
          <h1 className="text-4xl pt-2">
            {site?.jobReference || 'No available site reference'}
          </h1>
        </div>
        <p className="text-gray-500 text-sm pt-2">{site?.owners}</p>
      </div>
      <p>
        Build Complete:{' '}
        {site?.buildComplete ? (
          <Check className="inline text-lime-500" />
        ) : (
          <X className="inline text-red-600" />
        )}
      </p>
      <p>
        Build Start: {site?.buildStart ? formatDate(site?.buildStart) : 'N/A'}
      </p>
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
