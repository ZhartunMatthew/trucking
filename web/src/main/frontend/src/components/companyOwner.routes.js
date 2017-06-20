import React from 'react';
import { Route } from 'react-router';
import CompanyOwnerPage from './companyOwner.page';
import UserComponent from './user/user-component';
import CustomerComponent from './customer/customer-component';
import CarComponent from './car/car-component';
import InvoiceComponent from './invoice/invoice-component';
import WaybillComponent from './waybill/waybill-component';
import ReportPage from './report.page';
import ErrorPage from './error';

export const ownerRoutes = (
  <div>
    <Route path='/' component={CompanyOwnerPage}>
      <Route path ='/user' component={UserComponent}/>
      <Route path ='/customer' component={CustomerComponent}/>
      <Route path='/car' component={CarComponent}/>
      <Route path='/invoice' component={InvoiceComponent}/>
      <Route path='/waybill' component={WaybillComponent}/>
      <Route path='/report' component={ReportPage}/>
      <Route path="*" component={ErrorPage} />
    </Route>
  </div>
);
