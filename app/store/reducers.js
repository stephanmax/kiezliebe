import { TYPES } from './actions'

export const search = (state = {}, action) => {
  switch (action.type) {
    case TYPES.SET_SEARCH:
      return action.place
    default:
      return state
  }
}
