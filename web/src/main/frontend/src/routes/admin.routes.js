import React from 'react';
import { Route } from 'react-router';
import AdminPage from '../pages/admin.page';
import UserComponent from '../components/user/user-component';
import CustomerComponent from '../components/customer/customer-component';
import CarComponent from '../components/car/car-component';
import ErrorPage from '../pages/error';

export const adminRoutes = (
  <div>
    <Route path='/' component={AdminPage}>
      <Route path ='/user' component={UserComponent}/>
      <Route path ='/customer' component={CustomerComponent}/>
      <Route path='/car' component={CarComponent}/>
      <Route path='*' component={ErrorPage} />
    </Route>
  </div>
);
