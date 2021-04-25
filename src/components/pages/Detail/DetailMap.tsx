import {MapContainer, Polyline } from 'react-leaflet'
import React, { useState } from 'react'
import {TrailDetail} from '../../../redux/slices/trail'
import OpenstreetmapTileLayer from "../../common/OpenstreetmapTileLayer/OpenstreetmapTileLayer";

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
      <OpenstreetmapTileLayer />
      <Polyline pathOptions={polyLineOptions} positions={trail.gpx_points} />
    </MapContainer>
  )
}

export default DetailMap
