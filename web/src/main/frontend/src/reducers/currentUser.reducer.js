import {
  INIT_CURRENT_USER
} from '../constants/actionTypes';

const initialState = {
  currentUser: ''
};

const CurrentUserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_CURRENT_USER:
      return Object.assign({}, state, {currentUser: action.payload});

    default:
      return state;
  }
};

export default CurrentUserReducer;
