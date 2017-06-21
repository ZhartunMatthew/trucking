import React from 'react';
import { Route } from 'react-router';
import ManagerPage from '../components/manager.page';
import InvoiceComponent from '../components/invoice/invoice-component';
import WaybillComponent from '../components/waybill/waybill-component';
import ErrorPage from '../components/error';

export const managerRoutes = (
  <div>
    <Route path='/' component={ManagerPage}>
      <Route path ='/invoice' component={InvoiceComponent}/>
      <Route path ='/waybill' component={WaybillComponent}/>
      <Route path="*" component={ErrorPage} />
    </Route>
  </div>
);

