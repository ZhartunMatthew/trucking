import React from 'react';
import { Route } from 'react-router';
import SystemAdminPage from '../components/systemAdmin.page';
import TruckingCompanyComponent from '../components/truckingCompany/truckingCompany-component';
import ErrorPage from '../components/error';

export const systemAdminRoutes = (
  <div>
    <Route path='/' component={SystemAdminPage}>
      <Route path='/companies' component={TruckingCompanyComponent}/>
      <Route path="*" component={ErrorPage} />
    </Route>
  </div>
);

