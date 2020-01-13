import React from "react";
import { Trail } from "../../redux/slices/trail";

interface TrailVisibility {
    [id: number]: boolean
}

type props = {
    trails: Array<Trail>,
    trailVisibility: TrailVisibility
}

const MarkerList: React.FunctionComponent<props> = ({trails, trailVisibility}) => {

    let renderedTrails = trails.reduce(function(result: Array<string>, trail: Trail) {
        if (trailVisibility[trail.id] === true) {
            result.push(<li key={trail.id}>{trail.title}</li>);
        }
        return result;
    }, []);

    if(renderedTrails && renderedTrails.length) {
        return renderedTrails
    } else {
        return "No Trails given.";
    }
}

export default MarkerList;