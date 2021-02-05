import React from 'react'
import { Trail } from '../../../redux/slices/trail'
import { Button, Col, Row } from 'react-bootstrap'
import DetailMap from './DetailMap'

import styles from './Detail.module.scss'
import ImageSection from './ImageSection'

type DetailProps = {
  trail: Trail | undefined
}

const Detail: React.FunctionComponent<DetailProps> = ({ trail }) => {
  if (trail === undefined) return <></>

  return (
    <>
      <Row className={styles.ghy}>
        <Col>
          <DetailMap trail={trail} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>{trail.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div
            dangerouslySetInnerHTML={{
              __html: trail.description,
            }}
          />
        </Col>
      </Row>
      {trail.images.length > 0 && <ImageSection images={trail.images} />}
      <Row>
        <Col>
          <a href={trail.gpxFile}>
            <Button>Download GPX</Button>
          </a>
        </Col>
      </Row>
    </>
  )
}

export default Detail
