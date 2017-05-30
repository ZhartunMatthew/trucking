import {combineReducers} from 'redux';
import TruckingCompaniesReducer from './truckingCompany.reducer';
import OperationReducer from './operation.reducer';
import NavigationReducer from './navigation.reducer';
import UserRoleReducer from './userRole.reducer';
import UserReducer from './user.reducer';
import UserRolesListReducer from './userRolesList.reducer';
import CustomerReducer from './customer.reducer';
import CarReducer from './car.reducer';
import CarTypesReducer from './carTypes.reducer';
import InvoiceReducer from './invoice.reducer';
import DriverWaybillsReducer from './driverWaybill.reducer'

//This attached each reducer to particular field in application state
export default combineReducers({
  truckingCompanies: TruckingCompaniesReducer,
  operation: OperationReducer,
  navigation: NavigationReducer,
  userRole: UserRoleReducer,
  userRolesList: UserRolesListReducer,
  users: UserReducer,
  customers: CustomerReducer,
  cars: CarReducer,
  carTypes: CarTypesReducer,
  invoices: InvoiceReducer,
  driverWaybills: DriverWaybillsReducer
});
