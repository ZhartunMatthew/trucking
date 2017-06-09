import $ from 'jquery';
import { startOperation, cancelOperation } from './operation.action';
import {
  INIT_PRODUCTS, UPDATE_PRODUCTS
} from '../constants/actionTypes';

export function loadProducts(invoiceId) {
  return (dispatch) => {
    $.ajax({
      url: '/api/product',
      data: JSON.stringify(invoiceId),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      //CREATE ACTION
      dispatch({
        type: INIT_PRODUCTS, //action type, name according to convention
        payload: json //action data, name according to convention
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
