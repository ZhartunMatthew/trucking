import {
  SELECT_NAVIGATION_TAB
} from '../constants/actionTypes';

const initialState = {
  currentTab: ''
};

const navigationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SELECT_NAVIGATION_TAB:
      return Object.assign({}, state, {currentTab: action.payload});

    default:
      return state;
  }
};

export default navigationReducer;


