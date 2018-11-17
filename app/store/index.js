import { createStore, combineReducers } from 'redux'

import { search } from './reducers'

const storeFactory = (initialState = {}) => {
  const store = createStore(
    combineReducers({
      search
    }),
    initialState
  )
  
  store.subscribe(() => {
    console.log(store)
  })

  return store
}

export default storeFactory
