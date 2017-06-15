import {
  INIT_CARS
} from '../constants/actionTypes';

const initialState = {
  cars: []
};

const CarReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_CARS:
      return Object.assign({}, state, {cars: action.payload});
    default:
      return state;
  }
};

export default CarReducer;
