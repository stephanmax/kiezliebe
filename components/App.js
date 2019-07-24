import { h, Component } from 'preact'

import { Map, Search } from './containers'

export default class App extends Component {
  render() {
    return (
      <main>
        <Search />
        <Map />
      </main>
    )
  }
}
