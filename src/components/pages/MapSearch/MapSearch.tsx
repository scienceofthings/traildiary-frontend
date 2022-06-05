import React, {useCallback, useEffect, useState} from 'react'
import TrailMap from './TrailMap'
import VisibleTrails from './VisibleTrails'
import { useTypedSelector } from '../../../redux'
import L from 'leaflet'
import {selectTrailsData} from "../../../redux/slices/trail";
import {LatLngAndZoomLevel} from "../../App/MainProtected";

type MapSearchProps = {
  mapState: LatLngAndZoomLevel
  setMapState: (mapState: LatLngAndZoomLevel) => void
}

const MapSearch: React.FunctionComponent<MapSearchProps> = ({
  mapState,
  setMapState
}) => {
  const [map, setMap] = useState<L.Map | null>(null)

  const trails = useTypedSelector(selectTrailsData)

  const onMoveEnd = useCallback(() => {
    if (map === null) return
    setMapState({
      lat: map.getCenter().lat,
      lng: map.getCenter().lng,
      zoomLevel: map?.getZoom()})
  }, [map, setMapState])

  useEffect(() => {
    if (map === null) return
    onMoveEnd()
    map.on('move', onMoveEnd)
    return () => {
      map.off('move', onMoveEnd)
    }
  }, [map, onMoveEnd])

  return (
    <>
      {trails ? (
        <>
          <TrailMap trails={trails} setMap={setMap} mapState={mapState} />
          {map !== null &&  <VisibleTrails trails={trails} map={map} />}
        </>
      ) : (
        <b>Keine Trails vorhanden</b>
      )}
    </>
  )
}

export default MapSearch
