import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { Route } from 'wouter'
import { useTypedDispatch, useTypedSelector } from '../../redux'
import './styles.module.scss'
import MapSearch from '../pages/MapSearch/MapSearch'
import Navigation from './Navigation'
import Detail from '../pages/Detail/Detail'
import Regions from '../pages/Regions/Regions'
import { Container } from 'react-bootstrap'
import {fetchTrails} from "../../redux/api/fetchTrails";
import {selectTrailsData} from "../../redux/slices/trail";

const App: React.FunctionComponent = () => {
  const dispatch = useTypedDispatch()
  const trails = useTypedSelector(state => selectTrailsData(state))

  useEffect(() => {
    if (trails === undefined) {
      dispatch(fetchTrails())
    }
  }, [dispatch, trails])

  return (
    <>
      <header>
        <Navigation />
      </header>
      <Container>
        <main>
          <Route path="/">
            <MapSearch />
          </Route>
          <Route path="/categories">
            <Regions trails={trails} />
          </Route>
          <Route path="/trails/:trailId">
            {(params) => (
              <Detail trailId={parseInt(params.trailId)} />
            )}
          </Route>
        </main>
      </Container>
    </>
  )
}

export default hot(App)
