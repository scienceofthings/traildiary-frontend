import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'wouter'
import {
  composeRegionsPageUri,
  composeMapSearchPageUri,
} from '../../misc/uri'

const Navigation: React.FunctionComponent = () => {
  return (
    <Navbar variant="light" bg="light">
      <Nav>
        <Nav.Link as={Link} to={composeMapSearchPageUri()}>
          Karte
        </Nav.Link>
        <Nav.Link as={Link} to={composeRegionsPageUri()}>
          Nach Region
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Navigation
