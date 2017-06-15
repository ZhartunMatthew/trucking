import {
  INIT_USERS
} from '../constants/actionTypes';

const initialState = {
  users: []
};

const UserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_USERS:
      return Object.assign({}, state, {users: action.payload});

    default:
      return state;
  }
};

export default UserReducer;
