import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { Route } from 'wouter'
import { loadTrails, Trail } from '../../redux/slices/trail'
import { useTypedDispatch, useTypedSelector } from '../../redux'
import './styles.module.scss'
import MapSearch from '../pages/MapSearch/MapSearch'
import Navigation from './Navigation'
import Detail from '../pages/Detail/Detail'
import Categories from '../pages/Categories/Categories'
import { Container } from 'react-bootstrap'

const App: React.FunctionComponent = () => {
  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(loadTrails())
  }, [dispatch])

  const trails = useTypedSelector((state) => state.trails.trails)

  const getTrailById = (id: number): Trail | undefined => {
    const indexOfTrail = trails.findIndex((trail) => trail.id === id)
    if (indexOfTrail === -1) return undefined
    return trails[indexOfTrail]
  }

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
            <Categories trails={trails} />
          </Route>
          <Route path="/trails/:trailId">
            {(params) => (
              <Detail trail={getTrailById(parseInt(params.trailId))} />
            )}
          </Route>
        </main>
      </Container>
    </>
  )
}

export default hot(App)
