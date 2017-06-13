import React from 'react';
import Input from '../common/text-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createWaybill } from '../../actions/waybill.action';
import { updateOperation, resetOperation, cancelOperation } from '../../actions/operation.action';
import { Role } from '../../constants/roles';
import MyInput from '../common/input';
import Formsy from 'formsy-react';

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
    Formsy.addValidationRule('isRequired', function(values, value) {
      return !(/\s/g.test(value));
    });
    /*Formsy.addValidationRule('isText', function(values, value) {
      return /\w|\s/.test(value);
    });*/

    let creatingLabel = <span> Create waybill </span>;
    const disabledClass = this.props.changes ? '' : 'disabled';

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
          <button type='button' className='btn btn-success' onClick={this.cancel.bind(this)}>Close</button>
        </div>
      </div>;

    let role = this.props.userRole;
    userActions = role === Role.MANAGER ? managerActions : userActions;
    let disableEditing = role !== Role.MANAGER;

    return (
      <div>
        <Formsy.Form className='form-horizontal' onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)}>
          <fieldset>
            <legend> {creatingLabel} </legend>
            <MyInput id='waybillNumber' type='text' label='Waybill number' placeholder='' readOnly={disableEditing}
                   value={this.props.waybill.waybillNumber || ''} onChange={this.handleWaybillNumberChange.bind(this)}
                   validations='isAlphanumeric' validationError='Allowable characters only letters and numbers'
                     title='Waybill number' name='waybillNumber' />
            <MyInput id='number' type='text' label='Invoice number' placeholder='' title='Invoice number' name='number'
                   value={this.props.waybill.invoiceNumber || ''} onChange={this.handleInvoiceNumberChange.bind(this)} readOnly={true}/>
            <MyInput id='registerDate' type='text' label='Register date' placeholder=''
                   value={this.props.waybill.invoiceDate || ''} onChange={this.handleInvoiceDate.bind(this)}
                     readOnly={true} title='Register date' name='registerDate'/>
            <MyInput id='customerCompany' type='text' label='Customer company' placeholder=''
                   value={this.props.waybill.customerCompany || ''} onChange={this.handleCustomerCompany.bind(this)}
                     readOnly={true} title='Customer company' name='customerCompany'/>
            <MyInput id='driverFullName' type='text' label='Full name of driver' placeholder=''
                   value={this.props.waybill.driverFullName || ''} onChange={this.handleDriverFullName.bind(this)}
                     readOnly={true} title='Full name of driver' name='driverFullName'/>
            <MyInput id='price' type='text' label='Price' placeholder='' readOnly={disableEditing}
                   value={this.props.waybill.price || ''} onChange={this.handlePrice.bind(this)} title='Price'
                     name='price' required validations="isNumeric" validationError="This field must be a number"/>
            <MyInput id='totalDistance' type='text' label='Total distance' placeholder='' readOnly={disableEditing}
                   value={this.props.waybill.totalDistance || ''} onChange={this.handleTotalDistance.bind(this)} title='Total distance'
                     name='totalDistance' required validations="isNumeric" validationError="This field must be a number"/>
            <MyInput id='departureCountry' type='text' label='Departure country' placeholder='' readOnly={disableEditing}
                   value={this.props.waybill.departureCountry || ''} onChange={this.handleDepartureCountry.bind(this)} title='Departure country'
                     name='departureCountry' required validations='isAlphanumeric' validationError='Allowable characters only letters and numbers'/>
            <MyInput id='departureCity' type='text' label='Departure city' placeholder='' readOnly={disableEditing}
                   value={this.props.waybill.departureCity || ''} onChange={this.handleDepartureCity.bind(this)} title='Departure city'
                     name='departureCity' required validations='isAlphanumeric' validationError='Allowable characters only letters and numbers'/>
            <MyInput id='departureStreet' type='text' label='Departure street' placeholder='' readOnly={disableEditing}
                   value={this.props.waybill.departureStreet || ''} onChange={this.handleDepartureStreet.bind(this)} title='Departure street'
                     name='departureStreet' required validations='isAlphanumeric' validationError='Allowable characters only letters and numbers'/>
            <MyInput id='departureHouse' type='text' label='Departure house' placeholder='' readOnly={disableEditing}
                   value={this.props.waybill.departureHouse || ''} onChange={this.handleDepartureHouse.bind(this)} title='Departure house'
                     name='departureHouse' required validations='isAlphanumeric' validationError='Allowable characters only letters and numbers'/>
            <MyInput id='destinationCountry' type='text' label='Destination country' placeholder='' readOnly={disableEditing}
                   value={this.props.waybill.destinationCountry || ''} onChange={this.handleDestinationCountry.bind(this)} title='Destination country'
                     name='destinationCountry' required validations='isAlphanumeric' validationError='Allowable characters only letters and numbers'/>
            <MyInput id='destinationCity' type='text' label='Destination city' placeholder='' readOnly={disableEditing}
                   value={this.props.waybill.destinationCity || ''} onChange={this.handleDestinationCity.bind(this)} title='Destination city'
                     name='destinationCity' required validations='isAlphanumeric' validationError='Allowable characters only letters and numbers'/>
            <MyInput id='destinationStreet' type='text' label='Destination street' placeholder='' readOnly={disableEditing}
                   value={this.props.waybill.destinationStreet || ''} onChange={this.handleDestinationStreet.bind(this)} title='Destination street'
                     name='destinationStreet' required validations='isAlphanumeric' validationError='Allowable characters only letters and numbers'/>
            <MyInput id='destinationHouse' type='text' label='Destination house' placeholder='' readOnly={disableEditing}
                   value={this.props.waybill.destinationHouse || ''} onChange={this.handleDestinationHouse.bind(this)} title='Destination house'
                     name='destinationHouse' required validations='isAlphanumeric' validationError='Allowable characters only letters and numbers'/>
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

