import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
}

const changeState = ({ type, ...rest },state = initialState,) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
