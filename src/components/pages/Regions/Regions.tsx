import React, { useEffect } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../../redux'
import { Trail } from '../../../redux/slices/trail'
import { Link } from 'wouter'
import {composeRegionsPageUri, composeTrailDetailPageUri} from '../../../misc/uri'
import {fetchRegions} from "../../../redux/api/fetchRegions";
import {selectRegionsData} from "../../../redux/slices/region";
import {Col, Row, ListGroup, ListGroupItem } from "react-bootstrap";
import styles from './Regions.module.scss'
import Headline from "../../common/Headline/Headline";

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
              <Headline>Keine Region gefunden. </Headline>
          ) : (
              <>
                <Headline>
                  Übersicht der Regionen
                </Headline>
                <ListGroup>
                  {regions.map((region) => (
                      <ListGroupItem key={region.id}>
                        <a href={`${composeRegionsPageUri()}#region${region.id}`}>
                          {region.title}
                        </a>
                      </ListGroupItem>
                  ))}
                </ListGroup>
                {regions.map((region) => (
                <div className={styles.regionContainer} key={region.id}>
                  <h2 id={`region${region.id}`}>{region.title}</h2>
                  <ListGroup>
                    {getTrailsForRegion(region.id).length === 0 && <ListGroupItem>Keine Trails für diese Region vorhanden.</ListGroupItem>}
                    {getTrailsForRegion(region.id).map((trail) => (
                        <ListGroupItem key={trail.id}>
                          <Link to={composeTrailDetailPageUri(trail.id)}>
                            {trail.title}
                          </Link>
                        </ListGroupItem>
                    ))}
                  </ListGroup>
                </div>
            ))
          }
          </>
              )}
        </Col>
      </Row>
  )
}

export default Regions
