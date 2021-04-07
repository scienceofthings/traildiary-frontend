import React from 'react'
import {ResponsiveImageSources} from "../../../redux/slices/trail";

type ResponsiveImageProps = {
  image: ResponsiveImageSources
}
const ResponsiveImage: React.FunctionComponent<ResponsiveImageProps> = ({
  image,
}) => {
  const srcSetDefinition = `${image[0]} 210w, ${image[1]} 715w, ${image[2]} 1020w`
  return (
    <img
      className="img-fluid img-thumbnail"
      sizes="(max-width: 1020px) 100vw, 1020px"
      srcSet={srcSetDefinition}
      src={image[2]}
      alt={image[2]}
    />
  )
}

export default ResponsiveImage
