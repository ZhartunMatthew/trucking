import {
  UPDATE_CHECK_POINTS, DELETE_CHECK_POINT
} from '../constants/actionTypes';

export function updateCheckPoints(item) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CHECK_POINTS,
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
