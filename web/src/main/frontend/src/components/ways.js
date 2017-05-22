import React from 'react';
import { Route } from 'react-router';
import SystemAdminPage from '../components/systemAdminPage';
import TruckingCompanyComponent from '../components/truckingCompany/truckingCompany-component';
import UserComponent from './user/user-component';


export const ways = (
  <div>
    <Route path='/' component={SystemAdminPage}>
      <Route path='/companies' component={TruckingCompanyComponent}/>
    </Route>
  </div>
);

