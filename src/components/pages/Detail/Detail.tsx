import React from 'react'

type DetailProps = {
  trailId: number | undefined
}

const Detail: React.FunctionComponent<DetailProps> = ({ trailId }) => {
  return <>Detail: {trailId}</>
}

export default Detail
