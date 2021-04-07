import React, { useCallback, useEffect, useState } from 'react'
import { Trail } from '../../../redux/slices/trail'
import { composeTrailDetailPageUri } from '../../../misc/uri'
import { Link } from 'wouter'

type MarkerListProps = {
  trails: Trail[]
  map: L.Map
}

export type TrailVisibility = Record<number, boolean>

const VisibleTrails: React.FunctionComponent<MarkerListProps> = ({
  trails,
  map,
}) => {
  const [visibleTrails, setVisibleTrails] = useState<Trail[]>([])

  const onMoveEnd = useCallback(() => {
    setVisibleTrails(
      trails.filter((trail: Trail) => {
        return map.getBounds().contains(trail.start_position)
      })
    )
  }, [map, trails])

  useEffect(() => {
    onMoveEnd()
    map.on('move', onMoveEnd)
    return () => {
      map.off('move', onMoveEnd)
    }
  }, [map, onMoveEnd])

  const listItems = visibleTrails.map((trail) => {
    return (
      <li key={trail.id}>
        <Link to={composeTrailDetailPageUri(trail.id)}>{trail.title}</Link>
      </li>
    )
  })
  return (
    <>
      {visibleTrails.length > 0 ? (
        <ul>{listItems}</ul>
      ) : (
        <>Keine Trails vorhanden</>
      )}
    </>
  )
}

export default VisibleTrails
