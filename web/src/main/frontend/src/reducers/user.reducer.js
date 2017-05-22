import {
  INIT_USERS
} from '../constants/actionTypes';

const initialState = {
  users: []
};
/*
 Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
const UserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_USERS:
      return Object.assign({}, state, {users: action.payload});
    default:
      return state;
  }
};

export default UserReducer;
