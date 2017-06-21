import $ from 'jquery';
import { startOperation} from './operation.action';
import { INIT_CARS } from '../constants/actionTypes';
import { setActionDescription, setActionFail } from '../actions/modal.action'

export function loadCars() {
  return (dispatch) => {
    $.ajax({
      url: 'api/car',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json'
    }).done(json => {
      dispatch({
        type: INIT_CARS,
        payload: json
      });
    }).fail(() => {
      console.log('Could not get list of cars');
    });
  }
}

export function createCar(car) {
  let statusCode = 0;
  return (dispatch) => {
    $.ajax({
      type: 'POST',
      url: 'api/car',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(car),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json',
      error: function (xhr) {
        statusCode = xhr.status;
      }
    }).done((json) => {
      dispatch(startOperation(json));
      loadCars()(dispatch);

      setActionDescription({
        action: 'New car!',
        description: 'Car with number <b>' + car.number + '</b> have been successfully added'
      });
    }).fail(() => {
      setActionFail(statusCode);
      console.log('Could not save car');
    });
  }
}

export function updateCar(car) {
  return (dispatch) => {
    let statusCode = 0;
    $.ajax({
      type: 'PUT',
      url: 'api/car/' + car.id,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(car),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: 'json',
      error: function (xhr) {
        statusCode = xhr.status;
      }
    }).done((json) => {
      loadCars()(dispatch);
      dispatch(startOperation(json));

      setActionDescription({
        action: 'Car changing!',
        description: 'Info about car <b>' + car.number + '</b> has been changed'
      });
    }).fail(() => {
      setActionFail(statusCode);
      console.log('Could not update car');
    });
  };
}
