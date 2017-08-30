'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Root from './components/Root'

render (
  <Provider store={store}>
    <div>
      <h1>HAYYYY</h1>
      <Root/>
    </div>
  </Provider>,
  document.getElementById('main')
)