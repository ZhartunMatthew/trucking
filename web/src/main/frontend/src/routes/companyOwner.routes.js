import React from 'react';
import { Route } from 'react-router';
import CompanyOwnerPage from '../components/companyOwner.page';
import UserComponent from '../components/user/user-component';
import CustomerComponent from '../components/customer/customer-component';
import CarComponent from '../components/car/car-component';
import InvoiceComponent from '../components/invoice/invoice-component';
import WaybillComponent from '../components/waybill/waybill-component';
import ReportPage from '../components/report.page';
import ErrorPage from '../components/error';

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
