import React from 'react';
import { Route } from 'react-router';
import CompanyOwnerPage from './companyOwner.page';
import UserComponent from './user/user-component';
import CustomerComponent from './customer/customer-component';
import CarComponent from './car/car-component';

export const ownerRoutes = (
  <div>
    <Route path='/' component={CompanyOwnerPage}>
      <Route path ='/user' component={UserComponent}/>
      <Route path ='/customer' component={CustomerComponent}/>
      <Route path='/car' component={CarComponent}/>
    </Route>
  </div>
);
