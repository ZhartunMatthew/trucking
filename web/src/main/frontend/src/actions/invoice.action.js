import $ from 'jquery';
import { startOperation } from './operation.action';
import { INIT_INVOICES } from '../constants/actionTypes';

export function loadInvoices() {
  return (dispatch) => {
    $.ajax({
      url: 'api/invoice',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      dispatch({
        type: INIT_INVOICES,
        payload: json
      });
    }).fail(() => {
      console.log('Could not get list of invoices');
    });
  }
}

export function fetchInvoice(invoiceId) {
  return (dispatch) => {
    $.ajax({
      url: 'api/invoice/' + invoiceId,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(company => {
        dispatch(startOperation(company));
      }
    ).fail(() => {
      console.log('Could get a single invoice');
    });
  }
}

export function updateInvoice(invoice) {
  return (dispatch) => {
    $.ajax({
      type: 'PUT',
      url: 'api/invoice/' + invoice.id,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(invoice),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done((json) => {
      loadInvoices()(dispatch);
    }).fail(() => {
      console.log('Could not update invoice');
    });
  }
}

export function createInvoice(invoice) {
  return (dispatch) => {
    $.ajax({
      type: 'POST',
      url: 'api/invoice/',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(invoice),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done((json) => {
      loadInvoices()(dispatch);
      dispatch(startOperation(json));
    }).fail(() => {
      console.log('Could not create invoice');
    });
  }
}
