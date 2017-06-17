import React from 'react';
import { connect } from 'react-redux';
import WaybillForm from './waybill-form';
import { bindActionCreators } from 'redux';
import OwnerWaybillsTable from './ownerWaybill-table';
import { cancelOperation } from '../../actions/operation.action';
import { Role } from '../../constants/roles'
import MapComponent from '../map/map-component';
import InvoiceTable from '../invoice/invoice-table';
import { setActionFail} from '../../actions/modal.action';

class WaybillComponent extends React.Component {

  componentWillUnmount() {
    if (this.props.userRole === Role.COMPANY_OWNER) {
      this.props.cancelCurrentOperation();
    }
  }

  componentDidMount() {
    if(this.props.userRole === Role.MANAGER && this.props.currentWaybill === null) {
      setActionFail();
    }
  }

  render() {
    let role = this.props.userRole;
    let content = null;
    let waybillForm = null;
    let mapComponent = null;
    let emptyOperationContent = null;

    if(this.props.currentWaybill !== null) {
      if(role === Role.MANAGER) {
        waybillForm = <WaybillForm/>;
        mapComponent = <MapComponent/>;
      }
      if(role === Role.COMPANY_OWNER) {
        waybillForm = <WaybillForm changes={this.props.changes} waybill={this.props.currentWaybill}/>;
        mapComponent = <MapComponent waybill={this.props.currentWaybill}/>;
      }
    } else {
      if(role === Role.MANAGER) {
        this.context.router.push("/invoice");
        emptyOperationContent = <InvoiceTable invoices={this.props.invoices}/>;
      }
      if(role === Role.COMPANY_OWNER) {
        emptyOperationContent =
          <div className='row'>
            <div className='col align-self-center'>
              <OwnerWaybillsTable waybills={this.props.driverWaybills}/>
            </div>
          </div>;
      }
    }

    content = this.props.currentWaybill ? (
        <div className='row'>
          <div className='col-md-4'>
            {waybillForm}
          </div>
          <div className='col-md-8'>
            {mapComponent}
          </div>
        </div>
      ) : (
        emptyOperationContent
      );

    return (
      <div className='container'>
        {content}
      </div>
    );
  }
}

WaybillComponent.contextTypes = {
  router: React.PropTypes.func
};

let mapStateToProps = function (state) {
  return {
    checkPoints: state.checkPoints.checkPoints,
    driverWaybills: state.driverWaybills.driverWaybills,
    currentWaybill: state.operation.modifiedValue,
    changes: state.operation.changes,
    userRole: state.userRole.userRole,
    invoices: state.invoices.invoices
  };
};

function mapDispatchToProps(dispatch) {
  return {
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaybillComponent);


