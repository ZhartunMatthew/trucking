import React from 'react';
import { connect } from 'react-redux';
import WaybillForm from './waybill-form';
import CheckPointTable from '../checkPoint/checkPoint-table';
import { startOperation } from '../../actions/operation.action';
import { bindActionCreators } from 'redux';

class WaybillComponent extends React.Component {

  constructor(props) {
    super(props);
    this.props.startOperation({waybillNumber: '', departureCity: '', departureStreet: '', departureHouse: '',
      destinationCity: '', destinationStreet: '', destinationHouse: '', invoiceId: this.props.invoice.id,
      invoiceNumber: this.props.invoice.number, invoiceDate: this.props.invoice.registerDate,
      customerCompany: this.props.invoice.customerCompany, driverFullName: this.props.invoice.driverFullName,
      checkPoints: [], idTruckingCompany: this.props.invoice.truckingCompanyId});
  }

  render() {
    let content = (
      <div className='row'>
        <div className='col-sm-6'>
          <WaybillForm/>
        </div>
        <div className='col-sm-6'>
          <CheckPointTable/>
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
    invoice: state.operation.modifiedValue
  };
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaybillComponent);


