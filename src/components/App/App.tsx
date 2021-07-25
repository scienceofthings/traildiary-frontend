import React from 'react'
import { hot } from 'react-hot-loader/root'
import './styles.module.scss'
import NavigationProtected from './NavigationProtected'
import { Container } from 'react-bootstrap'
import MainProtected from "./MainProtected";
import MainPublic from "./MainPublic";
import {useTypedSelector} from "../../redux";
import {isAuthenticated} from "../../redux/slices/app";
import NavigationPublic from "./NavigationPublic";

const App: React.FunctionComponent = () => {

  const userIsAuthenticated = useTypedSelector(isAuthenticated)

  return (
    <>
      <header>
          {userIsAuthenticated ? (
            <NavigationProtected />
              ) : (
            <NavigationPublic />
          )}
      </header>
      <Container fluid>
        <main>
          {userIsAuthenticated ? (
            <MainProtected />
          ) : (
            <MainPublic />
          )}
        </main>
      </Container>
    </>
  )
}

export default hot(App)
