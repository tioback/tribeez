import { UPDATE_LOCATION } from 'react-router-redux'

import { TOGGLE_MENU, RESIZE, GET_MEMBER_SUCCESS, UPDATE_LANG } from '../actions'

import lang from '../utils/lang'
import messages from '../messages' // TODO

const defaultLang = lang.getDefault()

const initialState = {
  menu_visible: false,
  lang: defaultLang,
  messages: messages[defaultLang],
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return Object.assign({}, state, {
        menu_visible: false,
      })
    case TOGGLE_MENU:
      return Object.assign({}, state, {
        menu_visible: action.open,
      })
    case RESIZE:
      return Object.assign({}, state, {
        width: action.width,
        height: action.height,
      })
    case GET_MEMBER_SUCCESS:
      return Object.assign({}, state, {
        lang: action.user.lang,
        messages: messages[action.user.lang],
      })
    case UPDATE_LANG:
      return Object.assign({}, state, {
        lang: action.lang,
        messages: messages[action.lang],
      })
    default:
      return state
  }
}