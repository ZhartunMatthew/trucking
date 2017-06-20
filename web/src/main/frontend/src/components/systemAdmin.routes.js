import React from 'react';
import { Route } from 'react-router';
import SystemAdminPage from './systemAdmin.page';
import TruckingCompanyComponent from '../components/truckingCompany/truckingCompany-component';
import ErrorPage from './error';

export const systemAdminRoutes = (
  <div>
    <Route path='/' component={SystemAdminPage}>
      <Route path='/companies' component={TruckingCompanyComponent}/>
      <Route path="*" component={ErrorPage} />
    </Route>
  </div>
);

