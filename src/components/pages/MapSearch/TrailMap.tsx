import React, { useState } from 'react'
import { MapContainer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Trail } from '../../../redux/slices/trail'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import {composeTrailDetailPageUri} from "../../../misc/uri";
import {Link} from "wouter";
import OpenstreetmapTileLayer from "../../common/OpenstreetmapTileLayer/OpenstreetmapTileLayer";
import styles from './MapSearch.module.scss'

// https://github.com/PaulLeCam/react-leaflet/issues/453
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})
L.Marker.prototype.options.icon = DefaultIcon

type props = {
  trails: Trail[]
  setMap: (map: L.Map) => void
}

const TrailMap: React.FunctionComponent<props> = ({ trails, setMap }) => {
  const [lat] = useState(47.9959)
  const [lng] = useState(7.85222)
  const [zoom] = useState(13)

  return (
    <MapContainer
      className={styles.mapContainer}
      zoom={zoom}
      center={[lat, lng]}
      whenCreated={setMap}
    >
      <OpenstreetmapTileLayer />
      {trails && trails.length
        ? trails.map((trail) => (
            <Marker position={trail.start_position} key={trail.id}>
              <Popup><Link to={composeTrailDetailPageUri(trail.id)}>{trail.title}</Link></Popup>
            </Marker>
          ))
        : ''}
    </MapContainer>
  )
}

export default TrailMap
