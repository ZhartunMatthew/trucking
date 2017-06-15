import {
  INIT_CARTYPES
} from '../constants/actionTypes';

const initialState = {
  carTypes: []
};

const CarTypesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_CARTYPES:
      return Object.assign({}, state, {carTypes: action.payload});
    default:
      return state;
  }
};

export default CarTypesReducer;
