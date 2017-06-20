import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import CarTable from './car-table';
import CarForm from './car-form';
import { loadCarTypes } from '../../actions/carType.action';
import { loadCars } from '../../actions/car.action';
import { cancelOperation } from '../../actions/operation.action';
import { Role } from '../../constants/roles'
import { POOLING_TIMEOUT } from '../../constants/constants'

class CarComponent extends React.Component {

  componentDidMount() {
    this.props.loadCarTypes();
    if(this.props.userRole === Role.COMPANY_OWNER) {
      setInterval(function (self) {
        console.log("Car list were updated");
        self.props.loadCars();
      }, POOLING_TIMEOUT, this)
    }
  }

  componentWillUnmount() {
    if(this.props.userRole === Role.COMPANY_OWNER || this.props.userRole === Role.ADMIN) {
      this.props.cancelCurrentOperation();
    }
  }

  render() {
    let content = this.props.currentCar ? (
        <div className='row'>
          <div className='col-sm-4'>
            <CarForm changes={this.props.changes} car={this.props.currentCar}/>
          </div>
          <div className='col-sm-6'>
            <CarTable cars={this.props.cars}/>
          </div>
        </div>
      ) : (
        <div className='row'>
          <div className='col align-self-center'>
            <CarTable cars={this.props.cars}/>
          </div>
        </div>
      );
    return (
      <div className='container'>
        {content}
      </div>
    );
  }
}

let mapStateToProps = function (state) {
  return {
    cars: state.cars.cars,
    currentCar: state.operation.modifiedValue,
    changes: state.operation.changes,
    userRole: state.userRole.userRole
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loadCarTypes: bindActionCreators(loadCarTypes, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch),
    loadCars: bindActionCreators(loadCars, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarComponent);

