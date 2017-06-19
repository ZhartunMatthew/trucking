import {
  CREATE_CHECK_POINT, DELETE_CHECK_POINT, CLEAR_CHECK_POINTS
} from '../constants/actionTypes';

export function createCheckPoint(item) {
  return (dispatch) => {
    dispatch({
      type: CREATE_CHECK_POINT,
      payload: item
    })
  }
}

export function deleteCheckPoint(key) {
  return (dispatch) => {
    dispatch({
      type: DELETE_CHECK_POINT,
      payload: key
    })
  }
}

export function clearCheckPoints() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CHECK_POINTS,
      payload: null
    })
  }
}
