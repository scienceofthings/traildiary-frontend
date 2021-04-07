import React, { useEffect } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../../redux'
import { Trail } from '../../../redux/slices/trail'
import { Link } from 'wouter'
import { composeTrailDetailPageUri } from '../../../misc/uri'
import {fetchRegions} from "../../../redux/api/fetchRegions";
import {selectRegionsData} from "../../../redux/slices/regions";

type CategoryPropsType = {
  trails: Trail[] | undefined
}

const Regions: React.FunctionComponent<CategoryPropsType> = ({ trails }) => {
  const dispatch = useTypedDispatch()
  const regions = useTypedSelector(selectRegionsData)

  useEffect(() => {
    if (regions.length > 0) return
    dispatch(fetchRegions())
  }, [dispatch, regions])

  const getTrailsForCategory = (id: number): Trail[] => {
    if (trails === undefined) return []
    return trails.filter((trail) => trail.region === id)
  }
  return (
    <>
      {regions.map((region) => (
          <dl className="row" key={region.id}>
            <dt className="col">{region.title}</dt>
            {getTrailsForCategory(region.id).length === 0 && <div>Keine Trails gefunden</div>}
            {getTrailsForCategory(region.id).map((trail) => (
                <dd className="col" key={trail.id}>
                  <Link to={composeTrailDetailPageUri(trail.id)}>
                    {trail.title}
                  </Link>
                </dd>
            ))}
          </dl>
      ))
      }
    </>
  )
}

export default Regions
