import {MapContainer, Polyline } from 'react-leaflet'
import React, { useState } from 'react'
import {TrailDetail} from '../../../../redux/slices/trail'
import { TileLayer } from "../../../common/TileLayer";
import styles from './DetailMap.module.scss'

type DetailMapProps = {
  trail: TrailDetail
}

const DetailMap: React.FunctionComponent<DetailMapProps> = ({ trail }) => {
  const [zoom] = useState(13)
  const polyLineOptions = { color: 'red' }

  return (
    <MapContainer
      className={styles.mapContainer}
      zoom={zoom}
      center={[trail.start_position[0], trail.start_position[1]]}
    >
      <TileLayer />
      <Polyline pathOptions={polyLineOptions} positions={trail.gpx_points} />
    </MapContainer>
  )
}

export default DetailMap
