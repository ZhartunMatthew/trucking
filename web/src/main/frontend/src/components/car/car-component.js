import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import CarTable from './car-table';
import CarForm from './car-form';
import {loadCarTypes } from '../../actions/carType.action';

class CarComponent extends React.Component {

  componentDidMount() {
    this.props.loadCarTypes();
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
    changes: state.operation.changes
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loadCarTypes: bindActionCreators(loadCarTypes, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarComponent);

