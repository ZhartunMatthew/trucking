import {
  INIT_CARS
} from '../constants/actionTypes';

const initialState = {
  cars: []
};
/*
 Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
const CarReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_CARS:
      return Object.assign({}, state, {cars: action.payload});
    default:
      return state;
  }
};

export default CarReducer;
