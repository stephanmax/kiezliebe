import { connect } from 'preact-redux'

import SearchForm from './SearchForm'
import MapLeaflet from './MapLeaflet'

import { setSearch } from '../store/actions'

export const Search = connect(
  null,
  dispatch => ({
    onSetSearch(place) {
      dispatch(setSearch(place))
    }
  })
)(SearchForm)

export const Map = connect(
  state => ({
    search: state.search
  })
)(MapLeaflet)
