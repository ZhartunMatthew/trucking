import React from 'react';
import { Route } from 'react-router';
import DriverPage from './driver.page'
import DriverWaybillComponent from '../components/driverWaybills/driverWaybills-component';

export const driverRoutes = (
  <div>
    <Route path='/' component={DriverPage}>
      <Route path='/waybills' component={DriverWaybillComponent}/>
    </Route>
  </div>
);
