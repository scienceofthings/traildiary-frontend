import React, { useCallback, useState } from 'react'
import TrailMap from '../../Map/TrailMap'
import VisibleTrails from '../../Map/VisibleTrails'
import { useTypedSelector } from '../../../redux'

export type TrailVisibility = Record<number, boolean>

const Map: React.FunctionComponent = () => {
  const trails = useTypedSelector((state) => state.trails.trails)
  const [trailVisibility, setTrailVisibility] = useState<TrailVisibility>({})
  const showTrail = useCallback((trailId: number) => {
    setTrailVisibility((previousState) => ({
      ...previousState,
      [trailId]: true,
    }))
  }, [])
  const hideTrail = useCallback((trailId: number) => {
    setTrailVisibility((previousState) => ({
      ...previousState,
      [trailId]: false,
    }))
  }, [])

  return (
    <>
      {trails ? (
        <>
          <TrailMap
            trails={trails}
            showTrail={showTrail}
            hideTrail={hideTrail}
          />
          <VisibleTrails trails={trails} trailVisibility={trailVisibility} />
        </>
      ) : (
        <b>Keine Trails vorhanden</b>
      )}
    </>
  )
}

export default Map
