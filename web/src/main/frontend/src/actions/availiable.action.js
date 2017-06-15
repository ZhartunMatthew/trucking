import $ from 'jquery';
import { INIT_USERS, INIT_CARS } from '../constants/actionTypes';

export function loadFreeCars() {
  return (dispatch) => {
    $.ajax({
      url: 'api/car/available',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      dispatch({
        type: INIT_CARS,
        payload: json
      });
    }).fail(() => {
      console.log('Could not get list of cars');
    });
  }
}

export function loadFreeDrivers() {
  return (dispatch) => {
    $.ajax({
      url: 'api/user/freeDrivers',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      dispatch({
        type: INIT_USERS,
        payload: json
      });
    }).fail(() => {
      console.log('Could not get list of users');
    });
  }
}
