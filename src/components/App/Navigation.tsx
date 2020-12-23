import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

const Navigation: React.FunctionComponent = () => {
  return (
    <Navbar variant="light" bg="light">
      <Nav>
        <Nav.Link href="/">Karte</Nav.Link>
        <Nav.Link href="/list">Liste</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Navigation
