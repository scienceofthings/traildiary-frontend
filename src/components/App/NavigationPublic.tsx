import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'wouter'
import {
  composeLoginPageUri
} from '../../misc/uri'

const NavigationProtected: React.FunctionComponent = () => {
  return (
    <Navbar variant="light" bg="light">
      <Nav>
        <Nav.Link as={Link} to={composeLoginPageUri()}>
          Login
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default NavigationProtected
