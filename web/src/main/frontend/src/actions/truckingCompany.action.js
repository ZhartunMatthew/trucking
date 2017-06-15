import $ from 'jquery';
import { startOperation, cancelOperation } from './operation.action';
import {
  INIT_TRUCKINGCOMPANIES
} from '../constants/actionTypes';

export function loadTruckingCompanies() {
  return (dispatch) => {
    $.ajax({
      url: 'api/trucking-company',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      //CREATE ACTION
      dispatch({
        type: INIT_TRUCKINGCOMPANIES, //action type, name according to convention
        payload: json //action data, name according to convention
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
    $.ajax({
      type: 'POST',
      url: 'api/trucking-company',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(company),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done((json) => {
      dispatch(startOperation(json));
      loadTruckingCompanies()(dispatch);
    }).fail(() => {
      console.log('Could not save company');
    });
  }
}

export function updateTruckingCompany(company) {
  return (dispatch) => {
    $.ajax({
      type: 'PUT',
      url: 'api/trucking-company/' + company.id,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(company),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done((json) => {
      loadTruckingCompanies()(dispatch);
      dispatch(startOperation(json));
    }).fail(() => {
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
