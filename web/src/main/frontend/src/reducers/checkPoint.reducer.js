import {
  UPDATE_CHECK_POINTS, DELETE_CHECK_POINT
} from '../constants/actionTypes';

const initialState = {
  checkPoints: []
};

const CheckPointReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHECK_POINTS:
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

    default:
      return state;
  }
};

export default CheckPointReducer;
