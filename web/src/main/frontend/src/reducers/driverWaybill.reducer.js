import {
  INIT_DRIVERWAYBILLS, INIT_PRODUCTS
} from '../constants/actionTypes';

const initialState = {
  driverWaybills: [],
  productsInWaybill: [],
};
/*
 Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
const DriverWaybillsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_DRIVERWAYBILLS:
      return Object.assign({}, state, {driverWaybills: action.payload});
    case INIT_PRODUCTS:
      return Object.assign({}, state, {productsInWaybill: action.payload});
    default:
      return state;
  }
};

export default DriverWaybillsReducer;
