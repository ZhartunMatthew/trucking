import {
  INIT_OPERATION, UPDATE_OPERATION, RESET_OPERATION, CANCEL_OPERATION
} from '../constants/actionTypes';

const initialState = {
  originalValue: null,
  modifiedValue: null,
  changes: false
};

const operationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_OPERATION:
      return Object.assign({}, state, {
        originalValue: Object.assign({}, action.payload),
        modifiedValue: Object.assign({}, action.payload),
        changes: false
      });

    case UPDATE_OPERATION:
      const updatedObject = Object.assign({}, state.modifiedValue);
      if(action.payload.field !== null) {
        updatedObject[action.payload.field] = action.payload.value;
      }
      return Object.assign({}, state, {modifiedValue : updatedObject,  changes: true});

    case RESET_OPERATION:
      const newModifiedValue = Object.assign({}, state.originalValue);
      return Object.assign({}, state, {modifiedValue: newModifiedValue, changes: false});

    case CANCEL_OPERATION:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
};


export default operationReducer;
