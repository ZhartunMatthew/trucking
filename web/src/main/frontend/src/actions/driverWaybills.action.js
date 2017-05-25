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
