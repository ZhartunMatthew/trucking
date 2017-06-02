import React from 'react';
import { Route } from 'react-router';
import SystemAdminPage from './systemAdmin.page';
import TruckingCompanyComponent from '../components/truckingCompany/truckingCompany-component';



export const systemAdminRoutes = (
  <div>
    <Route path='/' component={SystemAdminPage}>
      <Route path='/companies' component={TruckingCompanyComponent}/>
    </Route>
  </div>
);

