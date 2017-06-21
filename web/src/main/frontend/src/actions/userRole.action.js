import $ from 'jquery';
import { INIT_USER_ROLE, INIT_ROLES, INIT_CURRENT_USER } from '../constants/actionTypes';

export function loadUserRole() {
  return (dispatch) => {
    $.ajax({
      url: 'api/userRole',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      dispatch({
        type: INIT_USER_ROLE,
        payload: json
      });
    }).fail(() => {
      console.log('Couldn\'t not get user role');
    });
  }
}

export function loadRoles() {
  return (dispatch) => {
    $.ajax({
      url: 'api/userRole/all',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      dispatch({
        type: INIT_ROLES,
        payload: json
      });
    }).fail(() => {
      console.log('Couldn\'t not get list of roles');
    });
  }
}

export function loadCurrentUser() {
  return (dispatch) => {
    $.ajax({
      url: 'api/userRole/current',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      dispatch({
        type: INIT_CURRENT_USER,
        payload: json
      });
    }).fail(() => {
      console.log('Couldn\'t not get current users');
    });
  }
}
