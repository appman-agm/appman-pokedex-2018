import React from 'react'
import ReactDOM from 'react-dom'
import reduxThunk from 'redux-thunk'
import {Provider} from 'react-redux'
import logger from 'redux-logger'
import { applyMiddleware,compose, createStore } from 'redux'
import './index.css'
import App from './App'
import reducers from './reducers';
const middlewareConfig = [
  reduxThunk,
  logger,
]
const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      ...middlewareConfig
    )
  )
)

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>
, document.getElementById('root'))
