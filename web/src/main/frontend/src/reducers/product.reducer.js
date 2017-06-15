import {
  INIT_PRODUCTS, UPDATE_PRODUCTS, CLEAR_PRODUCTS, DELETE_PRODUCT
} from '../constants/actionTypes';

const initialState = {
  products: []
};

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

    case DELETE_PRODUCT:
      let tempProducts = [], listProducts = [];
      Object.assign(tempProducts, state.products);
      tempProducts.map((product) => {
        if(product.id !== action.payload) {
          listProducts.push(product);
        }
      });
      return Object.assign({}, state, {products: listProducts});

    case CLEAR_PRODUCTS:
      return Object.assign({}, state, {products: []});

    default:
      return state;
  }
};

export default ProductsReducer;

