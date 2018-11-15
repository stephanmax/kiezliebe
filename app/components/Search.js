import { h, Component } from 'preact'

import { getOSMData } from 'Services/datalayer'

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      query: ''
    }
  }

  search = (e) => {
    this.setState({
      query: e.target.value
    })
    if (this.state.query.length >= 3) {
      getOSMData(this.state.query).then(console.log)
    }
  }

  render({}, state) {
    return <input type="search" name="query" value={state.query} onInput={this.search} />
  }
}
