import {
  INIT_TRUCKING_COMPANIES
} from '../constants/actionTypes';

const initialState = {
  truckingCompanies: []
};

const TruckingCompaniesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_TRUCKING_COMPANIES:
      return Object.assign({}, state, {truckingCompanies: action.payload});

    default:
      return state;
  }
};

export default TruckingCompaniesReducer;
