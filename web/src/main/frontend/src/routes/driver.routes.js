import React from 'react';
import { Route } from 'react-router';
import DriverPage from '../components/driver.page'
import DriverWaybillComponent from '../components/driverWaybills/driverWaybills-component';
import ErrorPage from '../components/error';

export const driverRoutes = (
  <div>
    <Route path='/' component={DriverPage}>
      <Route path='/waybills' component={DriverWaybillComponent}/>
      <Route path="*" component={ErrorPage} />
    </Route>
  </div>
);
