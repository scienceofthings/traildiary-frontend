import React, {useEffect} from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import DetailMap from './DetailMap'

import styles from './Detail.module.scss'
import ImageSection from './ImageSection'
import {useTypedDispatch, useTypedSelector} from "../../../redux";
import {fetchTrail} from "../../../redux/api/fetchTrail";
import {selectTrailData} from "../../../redux/slices/trail";

type DetailProps = {
  trailId: number
}

const Detail: React.FunctionComponent<DetailProps> = ({ trailId }) => {
    const dispatch = useTypedDispatch()
    const trailDetails = useTypedSelector((state) => selectTrailData(state, trailId))
    useEffect(() => {
        if (trailDetails !== undefined) return
        dispatch(fetchTrail(trailId))
    }, [dispatch, trailDetails, trailId])
  if (trailDetails === undefined) return <></>

  return (
    <>
      <Row className={styles.ghy}>
        <Col>
          <DetailMap trail={trailDetails} />
        </Col>
      </Row>
        <Row>
            <Col>
                <a href={trailDetails.gpx_file_name}>
                    <Button>Download GPX</Button>
                </a>
            </Col>
        </Row>
      <Row>
        <Col>
          <h1>{trailDetails.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Beschreibung</h2>
          {trailDetails.description}
        </Col>
      </Row>
      {trailDetails.technique.length > 0 && (
        <Row>
          <Col>
              <h2>Technik</h2>
            {trailDetails.technique}
          </Col>
        </Row>
        )}
        {trailDetails.todo.length > 0 && (
            <Row>
                <Col>
                    <h2>Todo</h2>
                    {trailDetails.todo}
                </Col>
            </Row>
        )}
      {trailDetails.images.length > 0 && <ImageSection images={trailDetails.images} />}

    </>
  )
}

export default Detail
