import { h, Component } from 'preact'
import debounce from 'lodash/debounce'

import { getOSMData } from '../services/datalayer'

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      active: false,
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

  onFocus = (e) => {
    this.setState({ active: true })
  }

  onBlur = (e) => {
    this.setState({ active: false })
  }

  render({onSetSearch}, {active, query, autocompleteResults}) {
    return (
      <form>
        <input
          type="search"
          name="query"
          autocomplete="off"
          value={query}
          onInput={this.onInput}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {active && query.length > 0 && autocompleteResults && autocompleteResults.length > 0 &&
          <ul>
            {autocompleteResults.map(result =>
              <li onMouseDown={() => onSetSearch(result)}>
                <b>{result.name}</b> {result.street}, {result.city}
              </li>
            )}
          </ul>
        }
      </form>
    )
  }
}
