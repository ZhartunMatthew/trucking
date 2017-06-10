import {
  UPDATE_CHECK_POINTS
} from '../constants/actionTypes';

export function updateCheckPoints(item) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CHECK_POINTS,
      payload: item
    })
  }
}
