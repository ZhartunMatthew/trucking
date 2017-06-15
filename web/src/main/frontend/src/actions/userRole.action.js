import $ from 'jquery';
import {
  INIT_USERROLE,
  INIT_ROLES,
  INIT_CURRENTUSER
} from '../constants/actionTypes';

export function loadUserRole() {
  return (dispatch) => {
    $.ajax({
      url: 'api/userRole',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      //CREATE ACTION
      dispatch({
        type: INIT_USERROLE, //action type, name according to convention
        payload: json //action data, name according to convention
      });
    }).fail(() => {
      console.log('Could not get user role');
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
      //CREATE ACTION
      dispatch({
        type: INIT_ROLES, //action type, name according to convention
        payload: json //action data, name according to convention
      });
    }).fail(() => {
      console.log('Could not get list of roles');
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
      //CREATE ACTION
      dispatch({
        type: INIT_CURRENTUSER, //action type, name according to convention
        payload: json //action data, name according to convention
      });
    }).fail(() => {
      console.log('Could not get current users');
    });
  }
}
