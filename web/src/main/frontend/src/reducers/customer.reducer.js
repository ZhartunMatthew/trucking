import {
  INIT_CUSTOMERS
} from '../constants/actionTypes';

const initialState = {
  customers: []
};
/*
 Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
const CustomersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_CUSTOMERS:
      return Object.assign({}, state, {customers: action.payload});
    default:
      return state;
  }
};

export default CustomersReducer;

