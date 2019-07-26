import { h, render } from 'preact';

import App from './components/App';

import 'assets/css/main.css';

if (module.hot) {
  require('preact/devtools');
}

render(<App />, document.getElementById('app'));
