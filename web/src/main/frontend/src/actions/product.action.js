import $ from 'jquery';
import {
  INIT_PRODUCTS,
  UPDATE_PRODUCTS,
  CLEAR_PRODUCTS,
  INIT_LOSTTYPES,
  DELETE_PRODUCT
} from '../constants/actionTypes';

export function loadProducts(invoiceId) {
  return (dispatch) => {
    $.ajax({
      url: 'api/product',
      data: JSON.stringify(invoiceId),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      dispatch({
        type: INIT_PRODUCTS,
        payload: json
      });
    }).fail(() => {
      console.log('Could not get list of products');
    });
  }
}

export function updateProducts(productItem) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PRODUCTS,
      payload: productItem
    })
  }
}

export function clearProducts() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_PRODUCTS,
      payload: null
    })
  }
}

export function deleteProduct(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_PRODUCT,
      payload: id
    })
  }
}

export function loadLostTypes() {
  return (dispatch) => {
    $.ajax({
      url: 'api/product/lostType',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      //CREATE ACTION
      dispatch({
        type: INIT_LOSTTYPES, //action type, name according to convention
        payload: json //action data, name according to convention
      });
    }).fail(() => {
      console.log('Could not get list of lost types');
    });
  }
}
