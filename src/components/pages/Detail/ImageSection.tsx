import React, { useState } from 'react'
import { ResponsiveImageSources } from '../../../redux/slices/trail'
import { Col, Modal, Row } from 'react-bootstrap'
import styles from './Detail.module.scss'
import ResponsiveImage from './ResponsiveImage'

type ImageSectionProps = {
  images: ResponsiveImageSources[]
}

const ImageSection: React.FunctionComponent<ImageSectionProps> = ({
  images,
}) => {
  const [imageModalIsShown, showImageModal] = useState(false)
  const [largeImage, setLargeImage] = useState('')
  const onImageModalShow = (
    imageToUseForModal: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    event.preventDefault()
    setLargeImage(imageToUseForModal)
    showImageModal(true)
  }
  return (
    <>
      <Modal
        show={imageModalIsShown}
        onHide={() => showImageModal(false)}
        dialogClassName={styles.imageModal}
        size="lg"
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <img className="img-fluid" src={largeImage} alt={largeImage} />
        </Modal.Body>
      </Modal>
      <Row>
        {images.map((image) => (
          <Col lg={3} md={4} key={image[0]}>
            <a
              href={image[2]}
              onClick={(event) => onImageModalShow(image[2], event)}
            >
              <ResponsiveImage image={image} />
            </a>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default ImageSection
