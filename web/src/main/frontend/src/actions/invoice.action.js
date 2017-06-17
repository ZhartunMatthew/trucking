import $ from 'jquery';
import { startOperation } from './operation.action';
import { INIT_INVOICES } from '../constants/actionTypes';
import { setActionDescription, setActionFail } from '../actions/modal.action'

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
    let statusCode = 0;
    $.ajax({
      type: 'PUT',
      url: 'api/invoice/' + invoice.id,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(invoice),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json',
      error: function (xhr) {
        statusCode = xhr.status;
      }
    }).done((json) => {
      loadInvoices()(dispatch);

      setActionDescription({
        action: 'Invoice accepted!',
        description: 'Invoice <b>№' + invoice.number + '</b> accepted for processing'
      })
    }).fail(() => {
      setActionFail(statusCode);
      console.log('Could not update invoice');
    });
  }
}

export function createInvoice(invoice) {
  return (dispatch) => {
    let statusCode = 0;
    $.ajax({
      type: 'POST',
      url: 'api/invoice/',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(invoice),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json',
      error: function (xhr) {
        statusCode = xhr.status;
      }
    }).done((json) => {
      loadInvoices()(dispatch);
      dispatch(startOperation(json));

      setActionDescription({
        action: 'New invoice!',
        description: 'Invoice <b>№' + invoice.number + '</b> has been successfully added'
      })
    }).fail(() => {
      setActionFail(statusCode);
      console.log('Could not create invoice');
    });
  }
}
