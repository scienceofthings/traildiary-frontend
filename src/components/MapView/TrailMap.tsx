import React, { useRef, useEffect, useState, useCallback } from 'react'
import { LatLngBounds, Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { Trail } from '../../redux/slices/trail'
import '../../../node_modules/leaflet/dist/leaflet.css'
import { LeafletEvent } from 'leaflet'

export const pointerIcon = new L.Icon({
  iconUrl: require('../../../node_modules/leaflet/dist/images/marker-icon.png'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  shadowUrl: '../../../node_modules/leaflet/dist/images/marker-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
})

type props = {
  trails: Trail[]
  showTrail: (trailId: number) => void
  hideTrail: (trailId: number) => void
}

const TrailMap: React.FunctionComponent<props> = ({
  trails,
  showTrail,
  hideTrail,
}) => {
  const mapReference = useRef<LatLngBounds>(null)
  const [lat] = useState(47.9959)
  const [lng] = useState(7.85222)
  const [zoom] = useState(13)

  const updateTrailVisibility = useCallback(
    (map: LatLngBounds) => {
      trails.forEach((trail) => {
        if (map.getBounds().contains(trail.position)) {
          showTrail(trail.id)
        } else {
          hideTrail(trail.id)
        }
      })
    },
    [showTrail, hideTrail, trails]
  )

  const handleMoveEnd = (event: LeafletEvent): void => {
    updateTrailVisibility(event.target)
  }

  useEffect(() => {
    if (
      mapReference.current !== null &&
      mapReference.current.leafletElement !== null
    ) {
      updateTrailVisibility(mapReference.current.leafletElement)
    }
  }, [mapReference, updateTrailVisibility])

  return (
    <Map
      ref={mapReference}
      style={{ height: '280px', width: '100%' }}
      zoom={zoom}
      onmoveend={handleMoveEnd}
      center={[lat, lng]}
    >
      <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {trails && trails.length
        ? trails.map((trail) => (
            <Marker position={trail.position} icon={pointerIcon} key={trail.id}>
              <Popup>{trail.title}</Popup>
            </Marker>
          ))
        : ''}
      ;
    </Map>
  )
}

export default TrailMap
