import {
  INIT_CURRENTUSER
} from '../constants/actionTypes';

const initialState = {
  currentUser: ''
};

const CurrentUserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_CURRENTUSER:
      return Object.assign({}, state, {currentUser: action.payload});

    default:
      return state;
  }
};

export default CurrentUserReducer;
