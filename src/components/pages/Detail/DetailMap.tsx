import {MapContainer, Polyline, TileLayer} from 'react-leaflet'
import React, { useState } from 'react'
import {TrailDetail} from '../../../redux/slices/trail'

type DetailMapProps = {
  trail: TrailDetail
}

const DetailMap: React.FunctionComponent<DetailMapProps> = ({ trail }) => {
  const [zoom] = useState(13)
  const polyLineOptions = { color: 'red' }

  return (
    <MapContainer
      style={{ height: '280px', width: '100%' }}
      zoom={zoom}
      center={[trail.start_position[0], trail.start_position[1]]}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline pathOptions={polyLineOptions} positions={trail.gpx_points} />
    </MapContainer>
  )
}

export default DetailMap
