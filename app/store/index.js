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
    console.log(JSON.stringify(store.getState()))
  })

  return store
}

export default storeFactory
