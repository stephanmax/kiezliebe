import { h, Component } from 'preact'
import debounce from 'lodash/debounce'

import { getOSMData } from 'Services/datalayer'

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      query: '',
      autocompleteResults: undefined
    }
  }

  handleSearch = debounce(
    (query) => getOSMData(query).then(res => this.setState({ autocompleteResults: res })),
    250,
    { maxWait: 1000 }
  )

  onInput = (e) => {
    this.setState({ query: e.target.value })
    if (e.target.value) {
      this.handleSearch(e.target.value)
    }
  }

  render({}, state) {
    return (
      <div>
        <input type="search" name="query" autocomplete="off" value={state.query} onInput={this.onInput} />
        {state.autocompleteResults && state.autocompleteResults.length > 0 &&
          <ul>
            {state.autocompleteResults.map(result =>
              <li>
                <b>{result.properties.name}</b> {result.properties.street}, {result.properties.city}
              </li>
            )}
          </ul>
        }
      </div>
    )
  }
}
