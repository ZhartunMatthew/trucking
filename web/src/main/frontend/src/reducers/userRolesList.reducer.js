import {
  INIT_ROLES
} from '../constants/actionTypes';

const initialState = {
  userRolesList: []
};
/*
 Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
const UserRolesListReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_ROLES:
      return Object.assign({}, state, {userRolesList: action.payload});

    default:
      return state;
  }
};

export default UserRolesListReducer;
