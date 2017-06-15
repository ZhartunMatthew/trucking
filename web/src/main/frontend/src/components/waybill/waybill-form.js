import React from 'react';
import Input from '../common/text-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createWaybill } from '../../actions/waybill.action';
import { updateOperation, resetOperation, cancelOperation } from '../../actions/operation.action';
import { Role } from '../../constants/roles';
import MyInput from '../common/input';
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

  handleDepartureCountry(event) {
    this.props.updateOperation('departureCountry', event.target.value);
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

  handleDepartureAddress(event) {
    this.props.updateOperation('departureAddress', event.target.value);
  }

  handleDestinationCountry(event) {
    this.props.updateOperation('destinationCountry', event.target.value);
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

  handleDestinationAddress(event) {
    this.props.updateOperation('destinationAddress', event.target.value);
  }

  save() {
    this.props.waybill.checkPoints = this.props.checkPoints;
    this.props.createWaybill(this.props.waybill);
    let action = "Новый путевой лист!";
    let description = "Путевой лист <b>№" + this.props.waybill.waybillNumber + "</b> был создан";
    setActionDescription(action, description);
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

    Formsy.addValidationRule('isStreet', function(values, value) {
      return (/^[а-яА-ЯёЁa-zA-Z0-9]+\s*[а-яА-ЯёЁa-zA-Z0-9]*-?\.?\s*\/*[а-яА-ЯёЁa-zA-Z0-9]*$/.test(value));
    });

    Formsy.addValidationRule('isCountryCity', function(values, value) {
      return (/^[а-яА-ЯёЁa-zA-Z0-9]+\s*[а-яА-ЯёЁa-zA-Z0-9]*-?\s*[а-яА-ЯёЁa-zA-Z0-9]*$/.test(value));
    });

    Formsy.addValidationRule('isHouseFlat', function(values, value) {
      return (/^[а-яА-ЯёЁa-zA-Z0-9]+\/*[а-яА-ЯёЁa-zA-Z0-9]*$/.test(value));
    });

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
                  onClick={this.save.bind(this)} disabled={!this.state.canSubmit}
                  data-toggle="modal"
                  data-target="#modal-action">Save
          </button>
        </div>
      </div>;

    let userActions =
      <div className='btn-toolbar text-center'>
        <div className='btn-group' role='group'>
          <button type='button' className='btn btn-success' onClick={this.cancel.bind(this)}>Close</button>
        </div>
      </div>;

    let userFields =
      <div>
        <MyInput id='departureCountry' name='departureCountry' type='text' title='Departure country' placeholder='' readOnly={disableEditing}
               value={this.props.waybill.departureCountry || ''} onChange={this.handleDepartureCountry.bind(this)}/>
        <MyInput id='departureCity' name='departureCity' type='text' title='Departure city' placeholder='' readOnly={disableEditing}
               value={this.props.waybill.departureCity || ''} onChange={this.handleDepartureCity.bind(this)}/>
        <MyInput id='departureStreet' name='departureStreet' type='text' title='Departure street' placeholder='' readOnly={disableEditing}
               value={this.props.waybill.departureStreet || ''} onChange={this.handleDepartureStreet.bind(this)}/>
        <MyInput id='departureHouse' name='departureHouse' type='text' title='Departure house' placeholder='' readOnly={disableEditing}
               value={this.props.waybill.departureHouse || ''} onChange={this.handleDepartureHouse.bind(this)}/>
        <MyInput id='destinationCountry' name='destinationCountry' type='text' title='Destination country' placeholder='' readOnly={disableEditing}
               value={this.props.waybill.destinationCountry || ''} onChange={this.handleDestinationCountry.bind(this)}/>
        <MyInput id='destinationCity' name='destinationCity' type='text' title='Destination city' placeholder='' readOnly={disableEditing}
               value={this.props.waybill.destinationCity || ''} onChange={this.handleDestinationCity.bind(this)}/>
        <MyInput id='destinationStreet' name='destinationStreet' type='text' title='Destination street' placeholder='' readOnly={disableEditing}
               value={this.props.waybill.destinationStreet || ''} onChange={this.handleDestinationStreet.bind(this)}/>
        <MyInput id='destinationHouse' name='destinationHouse' type='text' title='Destination house' placeholder='' readOnly={disableEditing}
               value={this.props.waybill.destinationHouse || ''} onChange={this.handleDestinationHouse.bind(this)}/>
      </div>;

    let managerFields =
      <div>
        <MyInput id='departureAddress' name='departureAddress' type='text' title='Departure address' placeholder='' readOnly={true}
               value={this.props.waybill.departureAddress || ''} onChange={this.handleDepartureAddress.bind(this)}/>
        <MyInput id='destinationAddress' name='destinationAddress' type='text' title='Destination address' placeholder='' readOnly={true}
               value={this.props.waybill.destinationAddress || ''} onChange={this.handleDestinationAddress.bind(this)}/>
        <CheckPointTable checkPoints={this.props.checkPoints}/>
      </div>;

    userActions = role === Role.MANAGER ? managerActions : userActions;
    userFields = role === Role.MANAGER ? managerFields : userFields;

    return (
      <div>
        <Formsy.Form className='form-horizontal' onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)}>
          <fieldset>
            <legend> {creatingLabel} </legend>
            <MyInput id='waybillNumber' type='text' placeholder='' readOnly={disableEditing}
                   value={this.props.waybill.waybillNumber || ''} onChange={this.handleWaybillNumberChange.bind(this)}
                     validations='isWaybillNumber' validationError='Allowable characters:letters, numbers,-'
                     title='Waybill number' name='waybillNumber' required/>
            <MyInput id='number' type='text' placeholder='' title='Invoice number' name='number'
                   value={this.props.waybill.invoiceNumber || ''} onChange={this.handleInvoiceNumberChange.bind(this)} readOnly={true}/>
            <MyInput id='registerDate' type='text' placeholder=''
                   value={this.props.waybill.invoiceDate || ''} onChange={this.handleInvoiceDate.bind(this)}
                     readOnly={true} title='Register date' name='registerDate'/>
            <MyInput id='customerCompany' type='text' title='Customer company' placeholder=''
                   value={this.props.waybill.customerCompany || ''} onChange={this.handleCustomerCompany.bind(this)}
                     readOnly={true} name='customerCompany'/>
            <MyInput id='driverFullName' name='driverFullName' type='text' title='Full name of driver' placeholder=''
                   value={this.props.waybill.driverFullName || ''} onChange={this.handleDriverFullName.bind(this)}
                   readOnly={true}/>
            <MyInput id='price' name='price' type='text' title='Price' placeholder='' readOnly={disableEditing}
                   value={this.props.waybill.price || ''} onChange={this.handlePrice.bind(this)}/>
            <MyInput id='totalDistance' name='totalDistance' type='text' title='Total distance, km' placeholder='' readOnly={true}
                   value={this.props.waybill.totalDistance || ''} onChange={this.handleTotalDistance.bind(this)}/>
            {userFields}
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

