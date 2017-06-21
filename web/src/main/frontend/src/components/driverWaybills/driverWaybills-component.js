import React from 'react';
import {connect} from 'react-redux';
import DriverWaybillsForm from './driverWaybills-form';
import DriverWaybillsTable from './driverWaybills-table';
import MapComponent from '../map/map-component';
import { Role } from '../../constants/roles';
import { POOLING_TIMEOUT } from '../../constants/constants';
import { loadDriverWaybills } from '../../actions/driverWaybills.action';
import { bindActionCreators } from 'redux';


class DriverWaybillComponent extends React.Component {

  componentDidMount() {
    if(this.props.userRole === Role.DRIVER) {
      this.driverWaybillLoader = setInterval(function (self) {
        console.log("Driver waybills has been updated");
        self.props.loadDriverWaybills();
      }, POOLING_TIMEOUT, this);
      console.log("Pulling of new waybills for driver started");
    }
  }

  componentWillUnmount() {
    if(this.props.userRole === Role.DRIVER) {
      clearInterval(this.driverWaybillLoader);
      console.log("Pulling of new waybills for driver stopped");
    }
  }

  render() {
    let content = this.props.currentDriverWaybill ? (
      <div className='row'>
        <div className='col-md-4'>
          <DriverWaybillsForm changes={this.props.changes} driverWaybill={this.props.currentDriverWaybill}/>
        </div>
        <div className='col-md-8'>
          <MapComponent waybill={this.props.currentDriverWaybill}/>
        </div>
      </div>
    ) : (
      <div className='row'>
        <div className='container col-sm-9'>
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
    changes: state.operation.changes,
    userRole: state.userRole.userRole
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loadDriverWaybills: bindActionCreators(loadDriverWaybills, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverWaybillComponent);
