import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import TruckingCompanyForm from './truckingCompany-form';
import DriverWaybillsTable from './driverWaybills-table';

class DriverWaybillComponent extends React.Component {

  render() {
    let content = this.props.currentDriverWaybill ? (
      <div className='row'>
        <div className='col-sm-6'>
          <TruckingCompanyForm changes={this.props.changes} truckingCompany={this.props.currentDriverWaybill}/>
        </div>
        <div className='col-sm-6'>
          <TruckingCompanyTable truckingCompanies={this.props.driverWaybills}/>
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
