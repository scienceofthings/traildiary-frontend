import React, { useEffect } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../../redux'
import { Trail } from '../../../redux/slices/trail'
import { Link } from 'wouter'
import { composeTrailDetailPageUri } from '../../../misc/uri'
import {fetchRegions} from "../../../redux/api/fetchRegions";
import {selectRegionsData} from "../../../redux/slices/region";
import {Col, Row} from "react-bootstrap";

type RegionProps = {
  trails: Trail[] | undefined
}

const Regions: React.FunctionComponent<RegionProps> = ({ trails }) => {
  const dispatch = useTypedDispatch()
  const regions = useTypedSelector(state => selectRegionsData(state))

  useEffect(() => {
    if (regions === undefined) {
      dispatch(fetchRegions())
    }
  }, [dispatch, regions])

  const getTrailsForRegion = (id: number): Trail[] => {
    if (trails === undefined) return []
    return trails.filter((trail) => trail.region === id)
  }

  return (
      <Row>
        <Col>
          {regions === undefined || regions.length === 0 ? (
              <h2>Keine Region gefunden. </h2>
          ) : (regions.map((region) => (
                <dl className="row" key={region.id}>
                  <dt className="col">{region.title}</dt>
                  {getTrailsForRegion(region.id).length === 0 && <div>Keine Trails für diese Region vorhanden.</div>}
                  {getTrailsForRegion(region.id).map((trail) => (
                      <dd className="col" key={trail.id}>
                        <Link to={composeTrailDetailPageUri(trail.id)}>
                          {trail.title}
                        </Link>
                      </dd>
                  ))}
                </dl>
            )))
          }
        </Col>
      </Row>
  )
}

export default Regions
