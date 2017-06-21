import $ from 'jquery';
import { startOperation } from './operation.action';
import { INIT_TRUCKING_COMPANIES } from '../constants/actionTypes';
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
        type: INIT_TRUCKING_COMPANIES,
        payload: json
      });
    }).fail(() => {
      console.log('Couldn\'t not get list of trucking companies');
    });
  }
}

export function createTruckingCompany(company) {
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
      statusCode !== 409 ? setActionFail(statusCode)
        : setValidationFail("Company with same taxpayer number already exists");
      console.log('Couldn\'t not save company');
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
      statusCode !== 409 ? setActionFail(statusCode)
        : setValidationFail("Company with same taxpayer number already exists");
      console.log('Couldn\'t not update company');
    });
  }
}
