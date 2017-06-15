import $ from 'jquery';
import { startOperation, cancelOperation } from './operation.action';
import { INIT_CUSTOMERS } from '../constants/actionTypes';

export function loadCustomers() {
  return (dispatch) => {
    $.ajax({
      url: 'api/customer-company',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      dispatch({
        type: INIT_CUSTOMERS,
        payload: json
      });
    }).fail(() => {
      console.log('Could not get list of customer companies');
    });
  }
}

export function fetchCustomer(companyId) {
  return (dispatch) => {
    $.ajax({
      url: 'api/customer-company/' + companyId,
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

export function makeNewCustomerCompany(company) {
  return (dispatch) => {
    $.ajax({
      type: 'POST',
      url: 'api/customer-company',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(company),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done((json) => {
      dispatch(startOperation(json));
      loadCustomers()(dispatch);
    }).fail(() => {
      console.log('Could not save company');
    });
  }
}

export function updateCustomerCompany(company) {
  return (dispatch) => {
    $.ajax({
      type: 'PUT',
      url: 'api/customer-company/' + company.id,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(company),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done((json) => {
      loadCustomers()(dispatch);
      dispatch(startOperation(json));
    }).fail(() => {
      console.log('Could not update company');
    });
  }
}


export function deleteCustomerCompany(company) {
  return (dispatch) => {
    $.ajax({
      type: 'DELETE',
      url: 'api/customer-company/' + company.id,
      contentType: 'application/json; charset=utf-8',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).done(() => {
      loadCustomers()(dispatch);
      dispatch(cancelOperation(null));
    }).fail(() => {
      console.log('Could not delete company');
    });
  }
}

