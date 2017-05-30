import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware , combineReducers } from 'redux';
import rootReducer from '../reducers/root.reducer.js';

//This function creates store and specifies initial state of the application.
//Also, it makes some middleware function listed to each state update
export default function configureStore() {
  const logger = createLogger();
  const store = createStore(rootReducer,
    {
      truckingCompanies: {truckingCompanies: []},
      cars: {cars: []},
      carTypes: {carTypes: []},
      customers: {customers: []},
      users: {users: []},
      userRolesList: {userRolesList: []},
      invoices: {invoices: []}
    },
    applyMiddleware(thunk, logger));
  return store;
}
