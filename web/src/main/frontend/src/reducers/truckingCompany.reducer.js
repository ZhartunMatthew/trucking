import {
  INIT_TRUCKINGCOMPANIES
} from '../constants/actionTypes';

const initialState = {
  truckingCompanies: []
};
/*
 Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
const TruckingCompaniesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_TRUCKINGCOMPANIES:
      return Object.assign({}, state, {truckingCompanies: action.payload});

    default:
      return state;
  }
};

export default TruckingCompaniesReducer;
