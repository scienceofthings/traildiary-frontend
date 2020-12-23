import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { Route } from 'wouter'
import { loadTrails } from '../../redux/slices/trail'
import { useTypedDispatch } from '../../redux'
import './styles.module.scss'
import MapSearch from '../pages/MapSearch/MapSearch'
import Navigation from './Navigation'
import Detail from '../pages/Detail/Detail'
import Categories from '../pages/Categories/Categories'

const App: React.FunctionComponent = () => {
  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(loadTrails())
  }, [dispatch])

  return (
    <>
      <Navigation />
      <Route path="/">
        <MapSearch />
      </Route>
      <Route path="/list">
        <Categories />
      </Route>
      <Route path="/detail/:trailId">
        {(params) => <Detail trailId={parseInt(params.trailId)} />}
      </Route>
    </>
  )
}

export default hot(App)
