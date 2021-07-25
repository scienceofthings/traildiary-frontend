import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'wouter'
import {
  composeRegionsPageUri,
  composeMapSearchPageUri, composeLogoutPageUri,
} from '../../misc/uri'

const NavigationProtected: React.FunctionComponent = () => {

  return (
    <Navbar variant="light" bg="light">
      <Nav>
        <Nav.Link as={Link} to={composeMapSearchPageUri()}>
          Karte
        </Nav.Link>
        <Nav.Link as={Link} to={composeRegionsPageUri()}>
          Nach Region
        </Nav.Link>
        <Nav.Link as={Link} to={composeLogoutPageUri()}>
            Logout
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default NavigationProtected
