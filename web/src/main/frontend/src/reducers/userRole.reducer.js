import {
  INIT_USERROLE
} from '../constants/actionTypes';

const initialState = {
  userRole: ''
};
/*
 Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
const UserRoleReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_USERROLE:
      return Object.assign({}, state, {userRole: action.payload});
    default:
      return state;
  }
};

export default UserRoleReducer;
