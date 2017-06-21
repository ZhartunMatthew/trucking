import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root.reducer.js';

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
