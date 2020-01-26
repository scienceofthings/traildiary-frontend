import React from "react";

import { Trail } from "../../redux/slices/trail";


type ListOfTrailsProps = {
    trails: Array<Trail>,
}

const ListOfTrails: React.FunctionComponent<ListOfTrailsProps> = ({trails}) => {

    return (
        trails.length ? (
          <ul>
            {trails.map((trail: Trail) => {
              return (<li key={trail.id}>{trail.title}</li>)
            })}
          </ul>
        ) : (
          <></>
        )
    )
}

export default ListOfTrails;