import React from 'react';
import { connect } from 'react-redux';
import WaybillForm from './waybill-form';
import CheckPointComponent from '../checkPoint/checkPoint-component';
import { startOperation } from '../../actions/operation.action';
import { bindActionCreators } from 'redux';

class WaybillComponent extends React.Component {

  constructor(props) {
    super(props);
    this.props.startOperation({
      waybillNumber: '',
      departureDate: '',
      departureCountry: '',
      departureCity: '',
      departureStreet: '',
      departureHouse: '',
      destinationCountry:'',
      destinationCity: '',
      destinationStreet: '',
      destinationHouse: '',
      price: '',
      invoiceId: this.props.invoice.id,
      invoiceNumber: this.props.invoice.number,
      invoiceDate: this.props.invoice.registerDate,
      customerCompany: this.props.invoice.customerCompany,
      driverFullName: this.props.invoice.driverFullName,
      checkPoints: [],
      idTruckingCompany: this.props.invoice.truckingCompanyId
    });
  }

  render() {
    let content = (
      <div className='row'>
        <div className='col-sm-6'>
          <WaybillForm/>
        </div>
        <div className='col-sm-6'>
          <CheckPointComponent/>
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
    invoice: state.operation.modifiedValue,
    checkPoints: state.checkPoints.checkPoints
  };
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaybillComponent);


