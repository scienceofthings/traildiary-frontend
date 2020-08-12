import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { Route } from 'wouter'
import { loadTrails } from '../../redux/slices/trail'
import { useTypedDispatch } from '../../redux'
import Map from '../pages/Map/Map'
import List from '../pages/List/List'
import './App.module.scss'
import Detail from '../pages/Detail/Detail'
import Navigation from '../Common/Navigation/Navigation'

const App: React.FunctionComponent = () => {
  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(loadTrails())
  }, [dispatch])

  return (
    <>
      <Navigation />
      <Route path="/">
        <Map />
      </Route>
      <Route path="/list">
        <List />
      </Route>
      <Route path="/detail/:trailId">
        {(params) => <Detail trailId={parseInt(params.trailId)} />}
      </Route>
    </>
  )
}

export default hot(App)
