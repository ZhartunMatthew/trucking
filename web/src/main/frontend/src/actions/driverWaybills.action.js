import $ from 'jquery';
import { startOperation } from './operation.action';
import {
  INIT_DRIVERWAYBILLS, INIT_PRODUCTS
} from '../constants/actionTypes';
import { setActionDescription, setActionFail } from '../actions/modal.action'

export function loadDriverWaybills() {
  return (dispatch) => {
    $.ajax({
      url: 'api/waybill/driver',
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

export function loadProducts(idInvoice) {
  return (dispatch) => {
    $.ajax({
      url: 'api/product/' + idInvoice,
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
      console.log('Could not get list of waybills');
    });
  }
}

export function passCheckPoint(checkPoint) {
  return (dispatch) => {
    let statusCode = 0;
    $.ajax({
      type: 'PUT',
      url: 'api/checkpoint/check',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(checkPoint),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json',
      error: function (xhr) {
        statusCode = xhr.status;
      }
    }).done((json) => {
      loadDriverWaybills()(dispatch);
      dispatch(startOperation(json));

      setActionDescription({
        action: 'Checkpoint passed!',
        description: 'Checkpoint <b>' + checkPoint.description + '</b> has been successfully passed'
      });
    }).fail(() => {
      setActionFail(statusCode);
      console.log('Could not update checkPoint');
    });
  }
}

export function passDestination(products, idWaybill) {
  return (dispatch) => {
    let statusCode = 0;
    $.ajax({
      type: 'PUT',
      url: 'api/waybill/check/' + idWaybill,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(products),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json',
      error: function (xhr) {
        statusCode = xhr.status;
      }
    }).done((json) => {
      loadDriverWaybills()(dispatch);
      dispatch(startOperation(json));

      setActionDescription({
        action: 'Waybill has been closed!',
        description: 'Waybill has been successfully closed'
      });
    }).fail(() => {
      setActionFail(statusCode);
      console.log('Could not update waybill');
    });
  }
}
