import {
  INIT_ROLES
} from '../constants/actionTypes';

const initialState = {
  userRolesList: []
};

const UserRolesListReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_ROLES:
      return Object.assign({}, state, {userRolesList: action.payload});

    default:
      return state;
  }
};

export default UserRolesListReducer;
