import {
  UPDATE_CHECK_POINTS
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

    default:
      return state;
  }
};

export default CheckPointReducer;
