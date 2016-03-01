import { routeActions } from 'react-router-redux'

import api from '../api'

import { GET_RESET_REQUEST, GET_RESET_SUCCESS, GET_RESET_FAILURE } from '../constants/actions'
import routes from '../constants/routes'

export default (token) => {
  return function(dispatch) {
    dispatch({
      type: GET_RESET_REQUEST,
    })
    api.get('reset', { token })
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_RESET_FAILURE,
          })
          dispatch(routeActions.push(routes.LOGIN))
        } else {
          dispatch({
            type: GET_RESET_SUCCESS,
            data: response,
          })
        }
      })
      .catch(() => {
        dispatch({
          type: GET_RESET_FAILURE,
        })
        dispatch(routeActions.push(routes.LOGIN))
      })
  }
}
