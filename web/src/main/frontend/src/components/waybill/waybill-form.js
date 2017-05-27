import React from 'react';
import Input from '../common/text-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOperation, resetOperation, cancelOperation } from '../../actions/operation.action';

class WaybillForm extends React.Component {

  handleInvoiceNumberChange(event) {
    this.props.updateOperation('number', event.target.value);
  }

  handleInvoiceDate(event) {
    this.props.updateOperation('register-date', event.target.value);
  }

  handleCustomerCompany(event) {
    this.props.updateOperation('customer-company', event.target.value);
  }

  handleDepartureDate(event) {
    this.props.updateOperation('departure-date', event.target.value);
  }

  handleDriverFullName(event) {
    this.props.updateOperation('driver-full-name', event.target.value);
  }

  handleDepartureCity(event) {
    this.props.updateOperation('departure-city', event.target.value);
  }

  handleDepartureStreet(event) {
    this.props.updateOperation('departure-city', event.target.value);
  }

  handleDepartureHouse(event) {
    this.props.updateOperation('departure-house', event.target.value);
  }

  handleDestinationCity(event) {
    this.props.updateOperation('destination-city', event.target.value);
  }

  handleDestinationStreet(event) {
    this.props.updateOperation('destination-city', event.target.value);
  }

  handleDestinationHouse(event) {
    this.props.updateOperation('destination-house', event.target.value);
  }

  save() {
    this.props.updateWaybill(this.props.waybill);
  }

  reset() {
    this.props.resetOperation();
  }

  cancel() {
    this.props.cancelOperation();
  }

  render() {
    let creatingLabel = <span> Create waybill </span>;
    const disabledClass = this.props.changes ? '' : 'disabled';
    return (
      <div>
        <form className='form-horizontal'>
          <fieldset>
            <legend> {creatingLabel} </legend>
            <Input id='number' type='text' label='Invoice number' placeholder='' value={this.props.waybill.invoiceNumber
            || ''} onChange={this.handleInvoiceNumberChange.bind(this)} readOnly={true}/>
            <Input id='register-date' type='text' label='Register date' placeholder=''
                   value={this.props.waybill.invoiceDate || ''} onChange={this.handleInvoiceDate.bind(this)}
                   readOnly={true}/>
            <Input id='customer-company' type='text' label='Customer company' placeholder=''
                   value={this.props.waybill.customerCompany || ''} onChange={this.handleCustomerCompany.bind(this)}
                   readOnly={true}/>
            <Input id='departure-date' type='text' label='Departure date' placeholder=''
                   value={this.props.waybill.departureDate || ''} onChange={this.handleDepartureDate.bind(this)}
                   readOnly={true}/>
            <Input id='driver-full-name' type='text' label='Full name of driver' placeholder=''
                   value={this.props.waybill.driverSurname + this.props.driverName + this.props.driverPatronymic || ''}
                   onChange={this.handleDriverFullName.bind(this)} readOnly={true}/>
            <Input id='departure-city' type='text' label='Departure city' placeholder=''
                   value={this.props.waybill.departureCity || ''} onChange={this.handleDepartureCity.bind(this)}/>
            <Input id='departure-street' type='text' label='Departure street' placeholder=''
                   value={this.props.waybill.departureStreet || ''} onChange={this.handleDepartureStreet.bind(this)}/>
            <Input id='departure-house' type='text' label='Departure house' placeholder=''
                   value={this.props.waybill.departureHouse || ''} onChange={this.handleDepartureHouse.bind(this)}/>
            <Input id='destination-city' type='text' label='Destination city' placeholder=''
                   value={this.props.waybill.destinationCity || ''} onChange={this.handleDestinationCity.bind(this)}/>
            <Input id='destination-street' type='text' label='Destination street' placeholder=''
                   value={this.props.waybill.destinationStreet || ''} onChange={this.handleDestinationStreet.bind(this)}/>
            <Input id='destination-house' type='text' label='Destination house' placeholder=''
                   value={this.props.waybill.destinationHouse || ''} onChange={this.handleDestinationHouse.bind(this)}/>
            <div className='btn-toolbar text-center'>
              <div className='btn-group' role='group'>
                <button type='button' className='btn btn-success' onClick={this.cancel.bind(this)}>Close</button>
              </div>
              <div className='btn-group float-right' role='group'>
                <button type='button' className={`${disabledClass} btn btn-default`}
                        onClick={this.props.changes ? this.reset.bind(this) : null}>Reset
                </button>
                <button type='button' className={`${disabledClass} btn btn-primary`}
                        onClick={this.props.changes ? this.save.bind(this) : null}>Save
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

WaybillForm.propTypes = {
  waybill: React.PropTypes.object.isRequired,
  updateWaybill: React.PropTypes.func.isRequired,
  changes: React.PropTypes.bool,
  updateOperation: React.PropTypes.func.isRequired,
  cancelOperation: React.PropTypes.func.isRequired,
  resetOperation: React.PropTypes.func.isRequired,
};

let mapStateToProps = function (state) {
  if (state.operation.modifiedValue.hasOwnProperty('registerDate')) {
    let tmp = {
      invoiceId: state.operation.modifiedValue.id,
      invoiceNumber: state.operation.modifiedValue.number,
      invoiceDate: state.operation.modifiedValue.registerDate,
      idTruckingCompany: state.operation.modifiedValue.truckingCompanyId,
      customerCompany: state.operation.modifiedValue.customerCompany
    };
    return {
      waybill: tmp
    };
  }
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    updateOperation: bindActionCreators(updateOperation, dispatch),
    cancelOperation: bindActionCreators(cancelOperation, dispatch),
    resetOperation: bindActionCreators(resetOperation, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaybillForm);

