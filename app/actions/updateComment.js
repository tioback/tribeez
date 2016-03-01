import {UPDATE_COMMENT_TEXT} from '../constants/actions'

export default (entry_id, content) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_COMMENT_TEXT,
      entry_id,
      content,
    })
  }
}
