import $ from 'jquery';
import { startOperation} from './operation.action';

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
    }).always((json) => {
      dispatch(startOperation(json));
    }).fail(() => {
      console.log('Could not create waybill');
    });
  }
}
