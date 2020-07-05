import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { loadTrails } from '../../redux/slices/trail'
import { useTypedDispatch } from '../../redux'
import './styles.module.scss'
import MapView from '../MapView/MapView'

const App: React.FunctionComponent = () => {
  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(loadTrails())
  }, [dispatch])

  return <MapView />
}

export default hot(App)
