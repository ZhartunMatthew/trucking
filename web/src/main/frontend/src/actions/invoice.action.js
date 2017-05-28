import $ from 'jquery';
import { startOperation, cancelOperation } from './operation.action';
import {
  INIT_INVOICES
} from '../constants/actionTypes';

export function loadInvoices() {
  return (dispatch) => {
    $.ajax({
      url: '/api/invoice',
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

export function updateInvoice(invoice) {
  return (dispatch) => {
    $.ajax({
      type: 'PUT',
      url: '/api/invoice/' + invoice.id,
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
