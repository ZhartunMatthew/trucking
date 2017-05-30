import {
  INIT_PRODUCTS
} from '../constants/actionTypes';

const initialState = {
  products: []
};
/*
 Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
const ProductsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_PRODUCTS:
      return Object.assign({}, state, {products: action.payload});
    default:
      return state;
  }
};

export default ProductsReducer;

