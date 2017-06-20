import {
  LOAD_HIGHCHARTS
} from '../constants/actionTypes';

const initialState = {
  highcharts: []
};

const HighchartsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_HIGHCHARTS:
      return Object.assign({}, state, {highcharts: action.payload});
    default:
      return state;
  }
};

export default HighchartsReducer;

