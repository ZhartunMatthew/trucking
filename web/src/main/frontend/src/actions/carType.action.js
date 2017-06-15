import $ from 'jquery';
import { INIT_CARTYPES } from '../constants/actionTypes';

export function loadCarTypes() {
  return (dispatch) => {
    $.ajax({
      url: 'api/car-type',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      dispatch({
        type: INIT_CARTYPES,
        payload: json
      });
    }).fail(() => {
      console.log('Could not get list of cartypes');
    });
  }
}
