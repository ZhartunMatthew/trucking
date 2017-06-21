import $ from 'jquery';
import { LOAD_HIGHCHARTS } from '../constants/actionTypes';

export function loadHighcharts() {
  return (dispatch) => {
    $.ajax({
      url: 'api/highcharts',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      dispatch({
        type: LOAD_HIGHCHARTS,
        payload: json
      });
    }).fail(() => {
      console.log('Couldn\'t not get highcharts');
    });
  }
}
