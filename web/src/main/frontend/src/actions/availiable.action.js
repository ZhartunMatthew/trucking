import $ from 'jquery';
import {
  INIT_USERS
} from '../constants/actionTypes';
import {
  INIT_CARS
} from '../constants/actionTypes';

export function loadFreeCars() {
  return (dispatch) => {
    $.ajax({
      url: '/api/car/available',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      dispatch({
        type: INIT_CARS, //action type, name according to convention
        payload: json //action data, name according to convention
      });
    }).fail(() => {
      console.log('Could not get list of cars');
    });
  }
}

export function loadFreeDrivers() {
  return (dispatch) => {
    $.ajax({
      url: '/api/user/freeDrivers',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      //CREATE ACTION
      dispatch({
        type: INIT_USERS, //action type, name according to convention
        payload: json //action data, name according to convention
      });
    }).fail(() => {
      console.log('Could not get list of users');
    });
  }
}
