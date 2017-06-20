import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCar } from '../../actions/car.action';
import { startOperation } from '../../actions/operation.action';
import { Role } from '../../constants/roles';
import { sentenceCase } from 'change-case';

class CarTable extends React.Component {

  onShowUpdateCarForm(car) {
    this.props.startOperation(car);
  }

  onShowCreateCarForm() {
    this.props.startOperation({number: '', brand: '',model: '', fuelConsumption: '', type: '', isAvailable: ''});
  }

  deleteCar(car) {
    this.props.deleteCar(car);
  }

  render() {
    let rows = this.props.cars.map((car, index) => {
      if(this.props.userRole === Role.ADMIN) {
        return (
          <tr key={car.id}>
            <th scope='row'> {index + 1} </th>
            <td> {car.number}</td>
            <td> {car.brand}</td>
            <td> {car.model}</td>
            <td style={{textAlign: 'center'}}>
              {car.fuelConsumption}
            </td>
            <td> {sentenceCase(car.type)}</td>
            <td style={{paddingRight: '0px'}}>
              <button className='btn btn-primary'
                      onClick={this.onShowUpdateCarForm.bind(this, car)}>
                      Update
              </button>
            </td>
          </tr>
        )
      }

      if(this.props.userRole === Role.COMPANY_OWNER) {
        return (
          <tr key={car.id}>
            <th scope='row'> {index + 1} </th>
            <td> {car.number}</td>
            <td> {car.brand}</td>
            <td> {car.model}</td>
            <td style={{textAlign: 'center'}}>
              {car.fuelConsumption}
            </td>
            <td> {sentenceCase(car.type)}</td>
            <td style={{paddingRight: '0px'}}>
                <button className='btn btn-primary'
                        onClick={this.onShowUpdateCarForm.bind(this, car)}>Open
                </button>
            </td>
          </tr>
        )
      }
    });
    let adminActions =
        <button className='btn btn-default'
                onClick={this.onShowCreateCarForm.bind(this)}> Create new car
        </button>;

    let ownerActions = null;
    let userActions = null;
    let role = this.props.userRole;
    userActions = role === Role.ADMIN ? adminActions : userActions;
    userActions = role === Role.COMPANY_OWNER ? ownerActions : userActions;

    return (
      <div>
        <h3>List of cars</h3>
        <table className='table table-hover'>
          <thead>
          <tr>
            <th>#</th>
            <th>Number</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Fuel consumption, L/100km</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        {userActions}
      </div>
    );
  }
}

CarTable.propTypes = {
  cars: React.PropTypes.array.isRequired,
  startOperation: React.PropTypes.func.isRequired,
  deleteCar: React.PropTypes.func.isRequired,
  userRole: React.PropTypes.String
};


let mapStateToProps = function (state) {
  return {
    userRole: state.userRole.userRole
  };
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch),
    deleteCar: bindActionCreators(deleteCar, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarTable);

