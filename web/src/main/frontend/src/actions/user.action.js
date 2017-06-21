import $ from 'jquery';
import { startOperation } from './operation.action';
import { INIT_USERS } from '../constants/actionTypes';
import { setActionDescription, setActionFail, setValidationFail } from '../actions/modal.action'

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
      console.log('Couldn\'t not get list of users');
    });
  }
}

export function createUser(user) {
  return (dispatch) => {
    let statusCode = 0;
    $.ajax({
      type: 'POST',
      url: 'api/user',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(user),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json',
      error: function (xhr) {
        statusCode = xhr.status;
      }
    }).done((json) => {
      dispatch(startOperation(json));
      loadUsers()(dispatch);

      setActionDescription({
        action: 'New user!',
        description: 'User <b>' + user.name + ' ' + user.surname + '</b> has been added'
      });
    }).fail(() => {
      statusCode !== 409 ? setActionFail(statusCode) : setValidationFail("Login is already exists");
      console.log('Couldn\'t not save user');
    });
  }
}

export function updateUser(user) {
  return (dispatch) => {
    let statusCode = 0;
    $.ajax({
      type: 'PUT',
      url: 'api/user/' + user.id,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(user),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json',
      error: function (xhr) {
        statusCode = xhr.status;
      }
    }).done((json) => {
      loadUsers()(dispatch);
      dispatch(startOperation(json));

      setActionDescription({
        action: 'User changing!',
        description: 'Info about user <b>' + user.name + ' ' + user.surname + '</b> has been changed'
      });
    }).fail(() => {
      statusCode !== 409 ? setActionFail(statusCode)
        : setValidationFail("Login is already exists");
      console.log('Couldn\'t not update user');
    });
  }
}
