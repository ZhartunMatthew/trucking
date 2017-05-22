import {
  INIT_CARTYPES
} from '../constants/actionTypes';

const initialState = {
  carTypes: []
};
/*
 Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
const CarTypesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_CARTYPES:
      return Object.assign({}, state, {carTypes: action.payload});
    default:
      return state;
  }
};

export default CarTypesReducer;
