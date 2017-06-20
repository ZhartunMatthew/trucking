import React from 'react';
import { Route } from 'react-router';
import AdminPage from './admin.page';
import UserComponent from './user/user-component';
import CustomerComponent from './customer/customer-component';
import CarComponent from './car/car-component';
import ErrorPage from './error';

export const adminRoutes = (
  <div>
    <Route path='/' component={AdminPage}>
      <Route path ='/user' component={UserComponent}/>
      <Route path ='/customer' component={CustomerComponent}/>
      <Route path='/car' component={CarComponent}/>
    </Route>
  </div>
);
