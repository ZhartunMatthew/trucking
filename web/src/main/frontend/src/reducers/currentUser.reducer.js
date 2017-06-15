import {
  INIT_CURRENTUSER
} from '../constants/actionTypes';

const initialState = {
  currentUser: ''
};
/*
 Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
const CurrentUserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_CURRENTUSER:
      return Object.assign({}, state, {currentUser: action.payload});

    default:
      return state;
  }
};

export default CurrentUserReducer;
