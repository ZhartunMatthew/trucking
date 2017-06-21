import {
  INIT_USER_ROLE
} from '../constants/actionTypes';

const initialState = {
  userRole: ''
};

const UserRoleReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_USER_ROLE:
      return Object.assign({}, state, {userRole: action.payload});

    default:
      return state;
  }
};

export default UserRoleReducer;
