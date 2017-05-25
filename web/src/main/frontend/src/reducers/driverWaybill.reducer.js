import {
  INIT_DRIVERWAYBILLS
} from '../constants/actionTypes';

const initialState = {
  driverWaybills: []
};
/*
 Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
const DriverWaybillsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_DRIVERWAYBILLS:
      return Object.assign({}, state, {driverWaybills: action.payload});
    default:
      return state;
  }
};

export default DriverWaybillsReducer;
