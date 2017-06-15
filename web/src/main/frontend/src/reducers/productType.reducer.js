import {
  INIT_LOSTTYPES
} from '../constants/actionTypes';

const initialState = {
  lostTypes: []
};

const lostTypesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_LOSTTYPES:
      return Object.assign({}, state, {lostTypes: action.payload});

    default:
      return state;
  }
};

export default lostTypesReducer;
