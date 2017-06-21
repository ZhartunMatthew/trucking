import {
  INIT_DRIVER_WAYBILLS, INIT_PRODUCTS
} from '../constants/actionTypes';

const initialState = {
  driverWaybills: [],
  productsInWaybill: [],
};

const DriverWaybillsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_DRIVER_WAYBILLS:
      return Object.assign({}, state, {driverWaybills: action.payload});

    case INIT_PRODUCTS:
      return Object.assign({}, state, {productsInWaybill: action.payload});

    default:
      return state;
  }
};

export default DriverWaybillsReducer;
