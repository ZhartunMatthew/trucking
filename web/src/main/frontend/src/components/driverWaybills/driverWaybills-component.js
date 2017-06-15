import React from 'react';
import {connect} from 'react-redux';
import DriverWaybillsForm from './driverWaybills-form';
import DriverWaybillsTable from './driverWaybills-table';
import MapComponent from '../map/map-component';

class DriverWaybillComponent extends React.Component {

  render() {
    let content = this.props.currentDriverWaybill ? (
      <div className='row'>
        <div className='col-md-5'>
          <DriverWaybillsForm changes={this.props.changes} driverWaybill={this.props.currentDriverWaybill}/>
        </div>
        <div className='col-md-7'>
          <MapComponent waybill={this.props.currentDriverWaybill}/>
        </div>
      </div>
    ) : (
      <div className='row'>
        <div className='col align-self-center'>
          <DriverWaybillsTable driverWaybills={this.props.driverWaybills}/>
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
    driverWaybills: state.driverWaybills.driverWaybills,
    currentDriverWaybill: state.operation.modifiedValue,
    changes: state.operation.changes
  };
};

export default connect(mapStateToProps, () => {})(DriverWaybillComponent );
