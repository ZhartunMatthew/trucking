import {
  INIT_INVOICES
} from '../constants/actionTypes';

const initialState = {
  invoices: []
};

const InvoiceReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case  INIT_INVOICES:
      return Object.assign({}, state, {invoices: action.payload});

    default:
      return state;
  }
};

export default InvoiceReducer;
