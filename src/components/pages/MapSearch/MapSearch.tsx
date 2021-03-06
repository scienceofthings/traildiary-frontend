import React, { useState } from 'react'
import TrailMap from './TrailMap'
import VisibleTrails from './VisibleTrails'
import { useTypedSelector } from '../../../redux'
import L from 'leaflet'
import {selectTrailsData} from "../../../redux/slices/trail";

const MapSearch: React.FunctionComponent = () => {
  const [map, setMap] = useState<L.Map>()

  const trails = useTypedSelector(selectTrailsData)

  return (
    <>
      {trails ? (
        <>
          <TrailMap trails={trails} setMap={setMap} />
          {map !== undefined && <VisibleTrails trails={trails} map={map} />}
        </>
      ) : (
        <b>Keine Trails vorhanden</b>
      )}
    </>
  )
}

export default MapSearch
