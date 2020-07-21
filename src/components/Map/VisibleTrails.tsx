import React from 'react'
import { Trail } from '../../redux/slices/trail'
import { TrailVisibility } from '../pages/Map/Map'

type MarkerListProps = {
  trails: Trail[]
  trailVisibility: TrailVisibility
}

const VisibleTrails: React.FunctionComponent<MarkerListProps> = ({
  trails,
  trailVisibility,
}) => {
  const visibleTrails = trails.reduce((result: Trail[], trail: Trail) => {
    if (trailVisibility[trail.id] === true) {
      result.push(trail)
    }
    return result
  }, [])

  const listItems = visibleTrails.map((trail) => {
    return <li key={trail.id}>{trail.title}</li>
  })
  return <>{visibleTrails.length ? listItems : <b>No Trails given</b>}</>
}

export default VisibleTrails
