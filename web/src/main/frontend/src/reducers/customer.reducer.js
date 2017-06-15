import {
  INIT_CUSTOMERS
} from '../constants/actionTypes';

const initialState = {
  customers: []
};

const CustomersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_CUSTOMERS:
      return Object.assign({}, state, {customers: action.payload});

    default:
      return state;
  }
};

export default CustomersReducer;

