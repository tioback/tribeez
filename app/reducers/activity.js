import {
  GET_ACTIVITY_REQUEST,
  GET_ACTIVITY_SUCCESS,
  GET_ACTIVITY_FAILURE,
  COMMENT_SUCCESS,
  UPDATE_COMMENT_TEXT,
  NEW_BILL_SUCCESS,
  UPDATE_BILL_SUCCESS,
  DELETE_BILL_SUCCESS,
  NEW_EVENT_SUCCESS,
  UPDATE_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
  NEW_POLL_SUCCESS,
  UPDATE_POLL_SUCCESS,
  PUT_POLL_SUCCESS,
  DELETE_POLL_SUCCESS,
  POST_VOTE_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  entries: [],
  events: [],
  polls: [],
  error: null,
  got: false,
  boxComments: {},
}

export default (state = initialState, action = null) => {
  let boxComments
  switch (action.type) {
    case GET_ACTIVITY_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      })
    case GET_ACTIVITY_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        entries: action.data.entries,
        events: action.data.events,
        polls: action.data.polls,
        got: true,
      })
    case GET_ACTIVITY_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    case COMMENT_SUCCESS:
      const entries = state.entries.slice() // copy
      entries.forEach((entry) => {
        if (entry.id === action.entry_id) {
          entry.comments = [...entry.comments, action.data] // copy + push
        }
      })
      boxComments = Object.assign({}, state.boxComments)
      boxComments[action.entry_id] = '' // reset
      return Object.assign({}, state, {
        entries,
        boxComments,
      })
    case UPDATE_COMMENT_TEXT:
      boxComments = Object.assign({}, state.boxComments)
      boxComments[action.entry_id] = action.content
      return Object.assign({}, state, {
        boxComments,
      })
    case NEW_BILL_SUCCESS:
    case UPDATE_BILL_SUCCESS:
    case DELETE_BILL_SUCCESS:
    case NEW_EVENT_SUCCESS:
    case UPDATE_EVENT_SUCCESS:
    case DELETE_EVENT_SUCCESS:
    case NEW_POLL_SUCCESS:
    case UPDATE_POLL_SUCCESS:
    case PUT_POLL_SUCCESS:
    case DELETE_POLL_SUCCESS:
    case POST_VOTE_SUCCESS:
      return {...state, got: false}
    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
