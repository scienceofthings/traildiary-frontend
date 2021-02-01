import { MapContainer, TileLayer } from 'react-leaflet'
import React, { useState } from 'react'
import { Trail } from '../../../redux/slices/trail'

type DetailMapProps = {
  trail: Trail
}

const DetailMap: React.FunctionComponent<DetailMapProps> = ({ trail }) => {
  const [lat] = useState(trail.position.lat)
  const [lng] = useState(trail.position.lng)
  const [zoom] = useState(13)

  // https://github.com/mpetazzoni/leaflet-gpx

  return (
    <MapContainer
      style={{ height: '280px', width: '100%' }}
      zoom={zoom}
      center={[lat, lng]}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}

export default DetailMap
