import React from 'react';
import Input from '../common/text-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createWaybill } from '../../actions/waybill.action';
import { updateOperation, resetOperation, cancelOperation } from '../../actions/operation.action';

class WaybillForm extends React.Component {

  handleWaybillNumberChange(event) {
    this.props.updateOperation('waybillNumber', event.target.value);
  }

  handleInvoiceNumberChange(event) {
    this.props.updateOperation('number', event.target.value);
  }

  handleInvoiceDate(event) {
    this.props.updateOperation('registerDate', event.target.value);
  }

  handleCustomerCompany(event) {
    this.props.updateOperation('customerCompany', event.target.value);
  }

  handleDriverFullName(event) {
    this.props.updateOperation('driverFullName', event.target.value);
  }

  handleDepartureCity(event) {
    this.props.updateOperation('departureCity', event.target.value);
  }

  handleDepartureStreet(event) {
    this.props.updateOperation('departureStreet', event.target.value);
  }

  handleDepartureHouse(event) {
    this.props.updateOperation('departureHouse', event.target.value);
  }

  handleDestinationCity(event) {
    this.props.updateOperation('destinationCity', event.target.value);
  }

  handleDestinationStreet(event) {
    this.props.updateOperation('destinationStreet', event.target.value);
  }

  handleDestinationHouse(event) {
    this.props.updateOperation('destinationHouse', event.target.value);
  }

  save() {
    this.props.createWaybill(this.props.waybill);
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
            <Input id='waybillNumber' type='text' label='Waybill number' placeholder=''
                   value={this.props.waybill.waybillNumber || ''} onChange={this.handleWaybillNumberChange.bind(this)}/>
            <Input id='number' type='text' label='Invoice number' placeholder=''
                   value={this.props.waybill.invoiceNumber || ''} onChange={this.handleInvoiceNumberChange.bind(this)}
                   readOnly={true}/>
            <Input id='registerDate' type='text' label='Register date' placeholder=''
                   value={this.props.waybill.invoiceDate || ''} onChange={this.handleInvoiceDate.bind(this)}
                   readOnly={true}/>
            <Input id='customerCompany' type='text' label='Customer company' placeholder=''
                   value={this.props.waybill.customerCompany || ''} onChange={this.handleCustomerCompany.bind(this)}
                   readOnly={true}/>
            <Input id='driverFullName' type='text' label='Full name of driver' placeholder=''
                   value={this.props.waybill.driverFullName || ''} onChange={this.handleDriverFullName.bind(this)}
                   readOnly={true}/>
            <Input id='departureCity' type='text' label='Departure city' placeholder=''
                   value={this.props.waybill.departureCity || ''} onChange={this.handleDepartureCity.bind(this)}/>
            <Input id='departureStreet' type='text' label='Departure street' placeholder=''
                   value={this.props.waybill.departureStreet || ''} onChange={this.handleDepartureStreet.bind(this)}/>
            <Input id='departureHouse' type='text' label='Departure house' placeholder=''
                   value={this.props.waybill.departureHouse || ''} onChange={this.handleDepartureHouse.bind(this)}/>
            <Input id='destinationCity' type='text' label='Destination city' placeholder=''
                   value={this.props.waybill.destinationCity || ''} onChange={this.handleDestinationCity.bind(this)}/>
            <Input id='destinationStreet' type='text' label='Destination street' placeholder=''
                   value={this.props.waybill.destinationStreet || ''} onChange={this.handleDestinationStreet.bind(this)}/>
            <Input id='destinationHouse' type='text' label='Destination house' placeholder=''
                   value={this.props.waybill.destinationHouse || ''} onChange={this.handleDestinationHouse.bind(this)}/>
            <div className='btn-toolbar text-center'>
              <div className='btn-group' role='group'>
                <button type='button' className='btn btn-success' onClick={this.cancel.bind(this)}>Close</button>
              </div>
              <div className='btn-group float-right' role='group'>
                <button type='button' className={`${disabledClass} btn btn-primary`}
                        onClick={null}>Save
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
  createWaybill: React.PropTypes.func.isRequired,
  changes: React.PropTypes.bool,
  updateOperation: React.PropTypes.func.isRequired,
  cancelOperation: React.PropTypes.func.isRequired,
  resetOperation: React.PropTypes.func.isRequired,
};

let mapStateToProps = function (state) {
  return {
    waybill: state.operation.modifiedValue,
    changes: state.operation.changes
  };
};

function mapDispatchToProps(dispatch) {
  return {
    createWaybill: bindActionCreators(createWaybill, dispatch),
    updateOperation: bindActionCreators(updateOperation, dispatch),
    cancelOperation: bindActionCreators(cancelOperation, dispatch),
    resetOperation: bindActionCreators(resetOperation, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaybillForm);

