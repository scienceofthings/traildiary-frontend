import React from 'react'
import { Trail } from '../../../redux/slices/trail'
import { Button } from 'react-bootstrap'
import DetailMap from './DetailMap'

type DetailProps = {
  trail: Trail | undefined
}

const Detail: React.FunctionComponent<DetailProps> = ({ trail }) => {
  if (trail === undefined) return <></>
  return (
    <>
      <h1>{trail.title}</h1>
      <DetailMap trail={trail} />
      <div
        dangerouslySetInnerHTML={{
          __html: trail.description,
        }}
      ></div>
      <div>
        <a href={trail.gpxFile}>
          <Button>Download</Button>
        </a>
      </div>
    </>
  )
}

export default Detail
