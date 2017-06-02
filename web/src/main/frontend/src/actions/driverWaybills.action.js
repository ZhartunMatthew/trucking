import $ from 'jquery';
import { startOperation, cancelOperation } from './operation.action';
import {
  INIT_DRIVERWAYBILLS
} from '../constants/actionTypes';

export function loadDriverWaybills() {
  return (dispatch) => {
    $.ajax({
      url: '/api/waybill/driver',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      //CREATE ACTION
      dispatch({
        type: INIT_DRIVERWAYBILLS,
        payload: json
      });
    }).fail(() => {
      console.log('Could not get list of waybills');
    });
  }
}

export function passCheckPoint(checkPoint) {
  return (dispatch) => {
    $.ajax({
      type: 'PUT',
      url: '/api/checkpoint/check',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(checkPoint),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done((json) => {
      loadDriverWaybills()(dispatch);
      dispatch(startOperation(json));
    }).fail(() => {
      console.log('Could not update checkPoint');
    });
  }
}

export function passDestination(waybill) {
  return (dispatch) => {
    $.ajax({
      type: 'PUT',
      url: '/api/waybill/check',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(waybill),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done((json) => {
      loadDriverWaybills()(dispatch);
      dispatch(startOperation(json));
    }).fail(() => {
      console.log('Could not update waybill');
    });
  }
}
