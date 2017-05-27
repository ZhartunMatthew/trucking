import React from 'react';
import { Route } from 'react-router';
import DispatcherPage from './dispatcher.page';
import InvoiceComponent from './invoice/invoice-component';
import Customer from './customer/customer-component'

export const dispatcherRoutes = (
  <div>
    <Route path='/' component={DispatcherPage}>
      <Route path ='/invoice' component={InvoiceComponent}/>
      <React path ='/customer' component={Customer}/>
    </Route>
  </div>
);
