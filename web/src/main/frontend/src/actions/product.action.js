import $ from 'jquery';
import { UPDATE_PRODUCTS, CLEAR_PRODUCTS, INIT_LOST_TYPES, DELETE_PRODUCT } from '../constants/actionTypes';

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
      dispatch({
        type: INIT_LOST_TYPES,
        payload: json
      });
    }).fail(() => {
      console.log('Couldn\'t not get list of lost types');
    });
  }
}
