import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './components/App/App'
import 'bootstrap/dist/css/bootstrap.css'
import {createRoot} from "react-dom/client";

const container = document.getElementById('map-container') as HTMLElement
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
