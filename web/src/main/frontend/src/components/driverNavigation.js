import React from 'react';
import { Route } from 'react-router';
import DriverPage from '../components/driverPage'
import DriverWaybillComponent from '../components/driverWaybills/driverWaybills-component';

export const driverNavigation = (
  <div>
    <Route path='/' component={DriverPage}>
      <Route path='/waybills' component={DriverWaybillComponent}/>
    </Route>
  </div>
);
