import React from 'react';
import { connect } from 'react-redux';
import WaybillForm from './waybill-form';
import { bindActionCreators } from 'redux';
import CheckPointComponent from '../checkPoint/checkPoint-component';
import OwnerWaybillsTable from './ownerWaybill-table';
import CheckPointTable from '../checkPoint/checkPoint-table';
import { cancelOperation } from '../../actions/operation.action';

class WaybillComponent extends React.Component {

  componentDidMount() {
    if(this.props.userRole === "COMPANY_OWNER") {
      this.props.cancelCurrentOperation();
    }
  }

  render() {
    let role = this.props.userRole;
    let content = null;
    if(role === 'MANAGER') {
      content = (
        <div className='row'>
          <div className='col-sm-4'>
            <WaybillForm/>
          </div>
          <div className='col-sm-6'>
            <CheckPointComponent/>
          </div>
        </div>
      );
    }
    if(role === 'COMPANY_OWNER'){
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


