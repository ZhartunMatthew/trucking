import {
  INIT_USERROLE
} from '../constants/actionTypes';

const initialState = {
  userRole: ''
};

const UserRoleReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_USERROLE:
      return Object.assign({}, state, {userRole: action.payload});

    default:
      return state;
  }
};

export default UserRoleReducer;
