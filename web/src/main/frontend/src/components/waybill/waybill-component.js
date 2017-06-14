import React from 'react';
import { connect } from 'react-redux';
import WaybillForm from './waybill-form';
import { bindActionCreators } from 'redux';
import OwnerWaybillsTable from './ownerWaybill-table';
import CheckPointTable from '../checkPoint/checkPoint-table';
import { cancelOperation } from '../../actions/operation.action';
import { Role } from '../../constants/roles'
import MapComponent from '../map/map-component';

class WaybillComponent extends React.Component {

  componentDidMount() {
    if(this.props.userRole === Role.COMPANY_OWNER) {
      this.props.cancelCurrentOperation();
    }
  }

  render() {
    let role = this.props.userRole;
    let content = null;
    if(role === Role.MANAGER) {
      content = (
        <div className='row'>
          <div className='col-md-4'>
            <WaybillForm/>
          </div>
          <div className='col-md-8'>
            <MapComponent/>
          </div>
        </div>
      );
    }
    if(role === Role.COMPANY_OWNER){
      content = this.props.currentWaybill ? (
          <div className='row'>
            <div className='col-sm-7'>
              <WaybillForm changes={this.props.changes} waybill={this.props.currentWaybill}/>
            </div>
            <div className='col-sm-5'>
              <CheckPointTable checkPoints={this.props.currentWaybill.checkPoints}/>
            </div>
          </div>
        ) : (
          <div className='row'>
            <div className='col align-self-center'>
              <OwnerWaybillsTable waybills={this.props.driverWaybills}/>
            </div>
          </div>
        );
    }
    return (
      <div className='container'>
        {content}
      </div>
    );
  }
}

let mapStateToProps = function (state) {
  return {
    checkPoints: state.checkPoints.checkPoints,
    driverWaybills: state.driverWaybills.driverWaybills,
    currentWaybill: state.operation.modifiedValue,
    changes: state.operation.changes,
    userRole: state.userRole.userRole
  };
};

function mapDispatchToProps(dispatch) {
  return {
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaybillComponent);


