import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import DriverWaybillsForm from './driverWaybills-form';
import DriverWaybillsTable from './driverWaybills-table';

class DriverWaybillComponent extends React.Component {

  render() {
    let content = this.props.currentDriverWaybill ? (
      <div className='row'>
        <div className='col-sm-7'>
          <DriverWaybillsForm changes={this.props.changes} driverWaybill={this.props.currentDriverWaybill}/>
        </div>
        <div className='col-sm-5'>
          <DriverWaybillsTable driverWaybills={this.props.driverWaybills}/>
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
