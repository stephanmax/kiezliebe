import { h, render } from 'preact'
import { Provider } from 'preact-redux'

import storeFactory from './store'
import App from './components/App'

import 'assets/css/main.css'

if (module.hot) require('preact/devtools')

render(
  <Provider store={storeFactory()}>
    <App />
  </Provider>,
  document.getElementById('app')
)
