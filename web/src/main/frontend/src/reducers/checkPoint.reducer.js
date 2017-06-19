import {
  CREATE_CHECK_POINT, DELETE_CHECK_POINT, CLEAR_CHECK_POINTS
} from '../constants/actionTypes';

const initialState = {
  checkPoints: []
};

const CheckPointReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CHECK_POINT:
      if(state.checkPoints === undefined) {
        state.checkPoints = [];
      }
      let newCheckPoints = [];
      Object.assign(newCheckPoints, state.checkPoints);
      newCheckPoints.push(action.payload);
      return Object.assign({}, state, {checkPoints: newCheckPoints});

    case DELETE_CHECK_POINT:
      let nextCheckPoints = state.checkPoints.filter(checkPoint => checkPoint.key !== action.payload);
      return Object.assign({}, state, {checkPoints: nextCheckPoints});

    case CLEAR_CHECK_POINTS:
      return Object.assign({}, state, {checkPoints: []});

    default:
      return state;
  }
};

export default CheckPointReducer;
