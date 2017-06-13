import {
  INIT_LOSTTYPES
} from '../constants/actionTypes';

const initialState = {
  lostTypes: []
};
/*
 Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
const lostTypesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_LOSTTYPES:
      return Object.assign({}, state, {lostTypes: action.payload});
    default:
      return state;
  }
};

export default lostTypesReducer;
