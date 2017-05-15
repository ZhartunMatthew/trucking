import {combineReducers} from 'redux';
import truckingCompaniesReducer from './genre.reducer';
import OperationReducer from './operation.reducer';
import NavigationReducer from './navigation.reducer';

//This attached each reducer to particular field in application state
export default combineReducers({
  truckingCompanies: truckingCompaniesReducer,
  operation: OperationReducer,
  navigation: NavigationReducer
});
