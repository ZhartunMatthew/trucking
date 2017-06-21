import React from 'react';
import { Route } from 'react-router';
import DispatcherPage from '../pages/dispatcher.page';
import InvoiceComponent from '../components/invoice/invoice-component';
import Customer from '../components/customer/customer-component'
import ErrorPage from '../pages/error';

export const dispatcherRoutes = (
  <div>
    <Route path='/' component={DispatcherPage}>
      <Route path ='/invoice' component={InvoiceComponent}/>
      <React path ='/customer' component={Customer}/>
      <Route path='*' component={ErrorPage} />
    </Route>
  </div>
);
