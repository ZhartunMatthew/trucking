import {
  INIT_PRODUCTS, UPDATE_PRODUCTS
} from '../constants/actionTypes';

const initialState = {
  products: []
};
/*
 Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_PRODUCTS:
      return Object.assign({}, state, {products: action.payload});

    case UPDATE_PRODUCTS:
      if(state.products === undefined) {
        state.products = [];
      }
      let newProducts = [];
      Object.assign(newProducts, state.products);
      newProducts.push(action.payload);
      return Object.assign({}, state, {products: newProducts});

    default:
      return state;
  }
};

export default ProductsReducer;

