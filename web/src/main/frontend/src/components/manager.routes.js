import React from 'react';
import { Route } from 'react-router';
import ManagerPage from './manager.page';
import InvoiceComponent from './invoice/invoice-component';
import WaybillComponent from './waybill/waybill-component';

export const managerRoutes = (
  <div>
    <Route path='/' component={ManagerPage}>
      <Route path ='/invoice' component={InvoiceComponent}/>
      <Route path ='/waybill' component={WaybillComponent}/>
    </Route>
  </div>
);

