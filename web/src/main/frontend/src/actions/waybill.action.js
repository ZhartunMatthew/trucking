import $ from 'jquery';
import { INIT_DRIVER_WAYBILLS } from '../constants/actionTypes';
import { setActionDescription, setActionFail } from '../actions/modal.action'
import { send } from './messaging.action';

export function createWaybill(waybill) {
  return () => {
    let statusCode = 0;
    $.ajax({
      type: 'POST',
      url: 'api/waybill',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(waybill),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json',
      error: function (xhr) {
        statusCode = xhr.status;
      }
    }).done((json) => {
      setActionDescription({
        action: 'New waybill!',
        description: 'Waybill <b>' + waybill.waybillNumber + '</b> has been successfully created'
      });
      console.log("JSON", json);
      send('/new-waybill', {
        companyId: json.idTruckingCompany,
        subject: 'New waybill!',
        content: 'Waybill <b>' + waybill.waybillNumber + '</b> has been added'
      });
    }).fail(() => {
      setActionFail(statusCode);
      console.log('Couldn\'t not create waybill');
    });
  }
}

export function loadWaybills() {
  return (dispatch) => {
    $.ajax({
      url: 'api/waybill',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      dispatch({
        type: INIT_DRIVER_WAYBILLS,
        payload: json
      });
    }).fail(() => {
      console.log('Couldn\'t not get list of waybills');
    });
  }
}
