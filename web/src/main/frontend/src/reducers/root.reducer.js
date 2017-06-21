import {combineReducers} from 'redux';
import TruckingCompaniesReducer from './truckingCompany.reducer';
import OperationReducer from './operation.reducer';
import UserRoleReducer from './userRole.reducer';
import UserReducer from './user.reducer';
import UserRolesListReducer from './userRolesList.reducer';
import CustomerReducer from './customer.reducer';
import CarReducer from './car.reducer';
import CarTypesReducer from './carTypes.reducer';
import InvoiceReducer from './invoice.reducer';
import ProductsReducer from './product.reducer';
import DriverWaybillsReducer from './driverWaybill.reducer';
import CurrentUserReducer from './currentUser.reducer';
import CheckPointReducer from './checkPoint.reducer';
import LostTypesReducer from './productType.reducer';
import HighchartsReducer from './highcharts.reducer';

export default combineReducers({
  truckingCompanies: TruckingCompaniesReducer,
  operation: OperationReducer,
  userRole: UserRoleReducer,
  userRolesList: UserRolesListReducer,
  users: UserReducer,
  customers: CustomerReducer,
  cars: CarReducer,
  carTypes: CarTypesReducer,
  invoices: InvoiceReducer,
  products: ProductsReducer,
  checkPoints: CheckPointReducer,
  driverWaybills: DriverWaybillsReducer,
  currentUser: CurrentUserReducer,
  lostTypes: LostTypesReducer,
  highcharts: HighchartsReducer
});
