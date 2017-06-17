import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createWaybill } from '../../actions/waybill.action';
import { updateOperation, resetOperation, cancelOperation } from '../../actions/operation.action';
import { Role } from '../../constants/roles';
import ValidatedInput from '../common/input';
import Formsy from 'formsy-react';
import { setActionDescription } from '../../actions/modal.action'
import CheckPointTable from '../checkPoint/checkPoint-table';

class WaybillForm extends React.Component {

  constructor() {
    super();

    this.state = {
      errors: {},
      canSubmit: false
    };
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

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

  handlePrice(event) {
    this.props.updateOperation('price', event.target.value);
  }

  handleTotalDistance(event) {
    this.props.updateOperation('totalDistance', event.target.value);
  }

  handleDepartureAddress(event) {
    this.props.updateOperation('departureAddress', event.target.value);
  }

  handleDestinationAddress(event) {
    this.props.updateOperation('destinationAddress', event.target.value);
  }

  save() {
    this.props.waybill.checkPoints = this.props.checkPoints;
    this.props.createWaybill(this.props.waybill);
    this.cancel();
  }

  cancel() {
    if (this.props.userRole === Role.COMPANY_OWNER){
      this.props.cancelOperation();
    }else {
      this.props.cancelOperation();
      this.context.router.push('/invoice');
    }
  }

  render() {

    Formsy.addValidationRule('isLetterOrNumber', function(values, value) {
      return (/^[а-яА-ЯёЁa-zA-Z0-9]+$/.test(value));
    });

    Formsy.addValidationRule('isWaybillNumber', function(values, value) {
      return (/^[а-яА-ЯёЁa-zA-Z0-9]+-?[а-яА-ЯёЁa-zA-Z0-9]*$/.test(value));
    });

    let creatingLabel = <span> Create waybill </span>;
    const disabledClass = this.props.changes ? '' : 'disabled';
    let role = this.props.userRole;
    let disableEditing = role !== Role.MANAGER;

    let managerActions =
      <div className='btn-toolbar text-center'>
        <div className='btn-group' role='group'>
          <button type='button' className='btn btn-success' onClick={this.cancel.bind(this)}>Close</button>
        </div>
        <div className='btn-group float-right' role='group'>
          <button type='button' className={`${disabledClass} btn btn-primary`}
                  onClick={this.save.bind(this)} disabled={!this.state.canSubmit}>Save
          </button>
        </div>
      </div>;

    let userActions =
      <div className='btn-toolbar text-center'>
        <div className='btn-group' role='group'>
          <button type='button'
                  className='btn btn-success'
                  onClick={this.cancel.bind(this)}>Close</button>
        </div>
      </div>;

    userActions = role === Role.MANAGER ? managerActions : userActions;
    let departureAddress = role === Role.MANAGER ? this.props.waybill.departureAddress
      : this.props.waybill.departureCountry + ', г.' + this.props.waybill.departureCity
      + ', ' + this.props.waybill.departureStreet + ', д.' + this.props.waybill.departureHouse;
    let destinationAddress = role === Role.MANAGER ? this.props.waybill.destinationAddress
      : this.props.waybill.destinationCountry + ', г.' + this.props.waybill.destinationCity
      + ', ' + this.props.waybill.destinationStreet + ', д.' + this.props.waybill.destinationHouse;
    let checkPoints = role === Role.MANAGER ? this.props.checkPoints : this.props.waybill.checkPoints;

    return (
      <div>
        <Formsy.Form className='form-horizontal' onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)}>
          <fieldset>
            <legend> {creatingLabel} </legend>
            <ValidatedInput id='waybillNumber'
                            type='text'
                            placeholder=''
                            readOnly={disableEditing}
                            value={this.props.waybill.waybillNumber || ''}
                            onChange={this.handleWaybillNumberChange.bind(this)}
                            validations='isWaybillNumber'
                            validationError='Allowable characters:letters, numbers,-'
                            title='Waybill number'
                            name='waybillNumber'
                            required/>

            <ValidatedInput id='number'
                            type='text'
                            placeholder=''
                            title='Invoice number'
                            name='number'
                            value={this.props.waybill.invoiceNumber || ''}
                            onChange={this.handleInvoiceNumberChange.bind(this)}
                            readOnly={true}/>

            <ValidatedInput id='registerDate'
                            type='text'
                            placeholder=''
                            value={this.props.waybill.invoiceDate || ''}
                            onChange={this.handleInvoiceDate.bind(this)}
                            readOnly={true}
                            title='Register date'
                            name='registerDate'/>

            <ValidatedInput id='customerCompany'
                            type='text'
                            title='Customer company'
                            placeholder=''
                            value={this.props.waybill.customerCompany || ''}
                            onChange={this.handleCustomerCompany.bind(this)}
                            readOnly={true}
                            name='customerCompany'/>

            <ValidatedInput id='driverFullName'
                            name='driverFullName'
                            type='text'
                            title='Full name of driver'
                            placeholder=''
                            value={this.props.waybill.driverFullName || ''}
                            onChange={this.handleDriverFullName.bind(this)}
                            readOnly={true}/>

            <ValidatedInput id='price'
                            name='price'
                            type='text'
                            title='Price, $'
                            placeholder=''
                            readOnly={disableEditing}
                            value={this.props.waybill.price || ''}
                            onChange={this.handlePrice.bind(this)}/>

            <ValidatedInput id='totalDistance'
                            name='totalDistance'
                            type='text'
                            title='Total distance, km'
                            placeholder=''
                            readOnly={true}
                            value={this.props.waybill.totalDistance || ''}
                            onChange={this.handleTotalDistance.bind(this)}/>

            <ValidatedInput id='departureAddress'
                            name='departureAddress'
                            type='text'
                            title='Departure address'
                            placeholder=''
                            readOnly={true}
                            value={departureAddress || ''}
                            onChange={this.handleDepartureAddress.bind(this)}/>

            <ValidatedInput id='destinationAddress'
                            name='destinationAddress'
                            type='text'
                            title='Destination address'
                            placeholder=''
                            readOnly={true}
                            value={destinationAddress || ''}
                            onChange={this.handleDestinationAddress.bind(this)}/>

            <CheckPointTable checkPoints={checkPoints}/>
            {userActions}
          </fieldset>
        </Formsy.Form>
      </div>
    );
  }
}

WaybillForm.contextTypes = {
  router: React.PropTypes.func
};

WaybillForm.propTypes = {
  waybill: React.PropTypes.object.isRequired,
  checkPoints: React.PropTypes.array.isRequired,
  createWaybill: React.PropTypes.func.isRequired,
  changes: React.PropTypes.bool,
  updateOperation: React.PropTypes.func.isRequired,
  cancelOperation: React.PropTypes.func.isRequired,
  resetOperation: React.PropTypes.func.isRequired,
};

let mapStateToProps = function (state) {
  return {
    waybill: state.operation.modifiedValue,
    changes: state.operation.changes,
    checkPoints: state.checkPoints.checkPoints,
    userRole: state.userRole.userRole
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

