import $ from 'jquery';
import { startOperation, cancelOperation } from './operation.action';
import {
  INIT_TRUCKINGCOMPANIES
} from '../constants/actionTypes';
import { setActionDescription, setActionFail, setValidationFail } from '../actions/modal.action'

export function loadTruckingCompanies() {
  return (dispatch) => {
    $.ajax({
      url: 'api/trucking-company',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      dispatch({
        type: INIT_TRUCKINGCOMPANIES,
        payload: json
      });
    }).fail(() => {
      console.log('Could not get list of trucking companies');
    });
  }
}

export function fetchTruckingCompany(companyId) {
  return (dispatch) => {
    $.ajax({
      url: 'api/trucking-company/' + companyId,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(company => {
        dispatch(startOperation(company));
      }
    ).fail(() => {
      console.log('Could get a single company');
    });
  }
}

export function makeNewTruckingCompany(company) {
  return (dispatch) => {
    let statusCode = 0;
    $.ajax({
      type: 'POST',
      url: 'api/trucking-company',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(company),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json',
      error: function (xhr) {
        statusCode = xhr.status;
      }
    }).done((json) => {
      dispatch(startOperation(json));
      loadTruckingCompanies()(dispatch);

      setActionDescription({
        action: 'New trucking company!',
        description: 'Trucking company <b>' + company.name + '</b> has been successfully added'
      });
    }).fail(() => {
      setActionFail(statusCode);
      console.log('Could not save company');
    });
  }
}

export function updateTruckingCompany(company) {
  return (dispatch) => {
    let statusCode = 0;
    $.ajax({
      type: 'PUT',
      url: 'api/trucking-company/' + company.id,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(company),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json',
      error: function (xhr) {
        statusCode = xhr.status;
      }
    }).done((json) => {
      loadTruckingCompanies()(dispatch);
      dispatch(startOperation(json));

      setActionDescription({
        action: 'Trucking company changing!',
        description: 'Info about trucking company <b>' + company.name + '</b> has been changed'
      });
    }).fail(() => {
      setActionFail(statusCode);
      console.log('Could not update company');
    });
  }
}


export function deleteTruckingCompany(company) {
  return (dispatch) => {
    $.ajax({
      type: 'DELETE',
      url: 'api/trucking-company/' + company.id,
      contentType: 'application/json; charset=utf-8',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).done(() => {
      loadTruckingCompanies()(dispatch);
      dispatch(cancelOperation(null));
    }).fail(() => {
      console.log('Could not delete company');
    });
  }
}
