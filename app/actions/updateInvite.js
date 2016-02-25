import { UPDATE_INVITE_DATA } from '../actions'

export default (data) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_INVITE_DATA,
      data,
    })
  }
}