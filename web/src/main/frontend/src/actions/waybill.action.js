import $ from 'jquery';
import {
  INIT_DRIVERWAYBILLS
} from '../constants/actionTypes';

export function createWaybill(waybill) {
  return (dispatch) => {
    $.ajax({
      type: 'POST',
      url: '/api/waybill',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(waybill),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).fail(() => {
      console.log('Could not create waybill');
    });
  }
}

export function loadWaybills() {
  return (dispatch) => {
    $.ajax({
      url: '/api/waybill',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      dispatch({
        type: INIT_DRIVERWAYBILLS,
        payload: json
      });
    }).fail(() => {
      console.log('Could not get list of waybills');
    });
  }
}
