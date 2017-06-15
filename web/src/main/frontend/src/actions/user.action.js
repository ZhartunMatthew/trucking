import $ from 'jquery';
import { startOperation, cancelOperation } from './operation.action';
import {
  INIT_USERS
} from '../constants/actionTypes';


export function loadUsers() {
  return (dispatch) => {
    $.ajax({
      url: 'api/user',
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

export function fetchUser(userId) {
  return (dispatch) => {
    $.ajax({
      url: 'api/user/' + userId,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(user => {
        dispatch(startOperation(user));
      }
    ).fail(() => {
      console.log('Could get a single user');
    });
  }
}

export function makeNewUser(user) {
  return (dispatch) => {
    $.ajax({
      type: 'POST',
      url: 'api/user',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(user),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done((json) => {
      dispatch(startOperation(json));
      loadUsers()(dispatch);
    }).fail(() => {
      console.log('Could not save user');
    });
  }
}

export function updateUser(user) {
  return (dispatch) => {
    $.ajax({
      type: 'PUT',
      url: 'api/user/' + user.id,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(user),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done((json) => {
      loadUsers()(dispatch);
      dispatch(startOperation(json));
    }).fail(() => {
      console.log('Could not update user');
    });
  }
}


export function deleteUser(user) {
  return (dispatch) => {
    $.ajax({
      type: 'DELETE',
      url: '/pi/user/' + user.id,
      contentType: 'application/json; charset=utf-8',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).done(() => {
      loadUsers()(dispatch);
      dispatch(cancelOperation(null));
    }).fail(() => {
      console.log('Could not delete user');
    });
  }
}



