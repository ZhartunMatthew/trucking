import $ from 'jquery';
import {
  INIT_CARTYPES
} from '../constants/actionTypes';

export function loadCarTypes() {
  return (dispatch) => {
    $.ajax({
      url: '/api/car-type',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      //CREATE ACTION
      dispatch({
        type: INIT_CARTYPES, //action type, name according to convention
        payload: json //action data, name according to convention
      });
    }).fail(() => {
      console.log('Could not get list of cartypes');
    });
  }
}
