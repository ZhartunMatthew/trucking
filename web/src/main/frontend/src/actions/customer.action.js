import $ from 'jquery';
import { startOperation } from './operation.action';
import { INIT_CUSTOMERS } from '../constants/actionTypes';
import { setActionDescription, setActionFail, setValidationFail } from '../actions/modal.action'

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

export function createCustomerCompany(company) {
  let statusCode = 0;
  return (dispatch) => {
    $.ajax({
      type: 'POST',
      url: 'api/customer-company',
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
      loadCustomers()(dispatch);

      setActionDescription({
        action: 'New customer!',
        description: 'Customer <b>' + company.name + '</b> has been successfully added'
      });
    }).fail(() => {
      statusCode !== 409 ? setActionFail(statusCode)
        : setValidationFail('Company with same taxpayer number already exists');
      console.log('Could not save company');
    });
  }
}

export function updateCustomerCompany(company) {
  let statusCode = 0;
  return (dispatch) => {
    $.ajax({
      type: 'PUT',
      url: 'api/customer-company/' + company.id,
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
      loadCustomers()(dispatch);
      dispatch(startOperation(json));

      setActionDescription({
        action: 'Customer changing!',
        description: 'Info about customer <b>' + company.name + '</b> has been changed'
      });
    }).fail(() => {
      statusCode !== 409 ? setActionFail(statusCode)
        : setValidationFail('Company with same taxpayer number already exists');
      console.log('Could not update company');
    });
  }
}
