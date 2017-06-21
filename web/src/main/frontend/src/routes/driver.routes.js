import React from 'react';
import { Route } from 'react-router';
import DriverPage from '../pages/driver.page'
import DriverWaybillComponent from '../components/driverWaybills/driverWaybills-component';
import ErrorPage from '../pages/error';

export const driverRoutes = (
  <div>
    <Route path='/' component={DriverPage}>
      <Route path='/waybill' component={DriverWaybillComponent}/>
      <Route path='*' component={ErrorPage} />
    </Route>
  </div>
);
