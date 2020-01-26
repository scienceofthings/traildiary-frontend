import React from "react"
import { Trail } from "../../redux/slices/trail"
import ListOfTrails from './ListOfTrails'

export type TrailVisibility = {
    [id: number]: boolean
}

type MarkerListProps = {
    trails: Array<Trail>,
    trailVisibility: TrailVisibility
}

const VisibleMarkers: React.FunctionComponent<MarkerListProps> = ({trails, trailVisibility}) => {

    const visibleTrails = trails.reduce((result: Array<Trail>, trail: Trail) => {
        if (trailVisibility[trail.id] === true) {
            result.push(trail);
        }
        return result;
    }, []);

        return (
            visibleTrails && visibleTrails.length ?
                <ListOfTrails trails={visibleTrails} />
             :
                <b>No Trails given</b>

        )
}

export default VisibleMarkers;