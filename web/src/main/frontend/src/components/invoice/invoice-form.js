import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateInvoice, createInvoice } from '../../actions/invoice.action';
import { loadFreeDrivers, loadFreeCars } from '../../actions/availiable.action';
import { startOperation, updateOperation, cancelOperation } from '../../actions/operation.action';
import { loadCustomers } from '../../actions/customer.action'
import { clearProducts } from '../../actions/product.action';
import { setValidationFail } from '../../actions/modal.action';
import { Role } from '../../constants/roles';
import ValidatedInput from '../common/input';
import ValidatedSelect from '../common/select-component';
import Formsy from 'formsy-react';
import { sentenceCase } from 'change-case';
import { DEFAULT_SELECT_VALUE, VALIDATION_ERRORS, MAX_LENGTH_OF_STRING, getDateString } from '../../constants/constants';

class InvoiceForm extends React.Component {

  constructor() {
    super();
    this.cancel = this.cancel.bind(this);
    this.state = {
      errors: {},
      canSubmit: false,
    };
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  componentDidMount() {
    if (this.props.userRole === Role.DISPATCHER) {
      this.props.loadFreeDrivers();
      this.props.loadFreeCars(true);
      this.props.loadAllCustomers();
    }
  }

  handleNumberChange(event) {
    this.props.updateOperation('number', event.target.value);
  }

  handleRegisterDate(event) {
    this.props.updateOperation('registerDate', event.target.value);
  }

  handleCustomerCompany(event) {
    this.props.updateOperation('customerCompany', event.target.value);
  }

  handleDestinationCustomerChange(event) {
    this.props.updateOperation('destinationCustomerCompanyId', event.target.value);
  }

  handleDriverChange(event) {
    this.props.updateOperation('driverId', event.target.value);
  }

  handleCarChange(event) {
    this.props.updateOperation('carId', event.target.value);
  }

  save() {
    this.props.updateInvoice(this.props.invoice);
    this.props.cancelOperation();
    this.props.startOperation({
      waybillNumber: '',
      departureDate: '',
      departureLatitude: '',
      departureLongitude: '',
      departureCountry: '',
      departureCity: '',
      departureStreet: '',
      departureHouse: '',
      destinationLatitude: '',
      destinationLongitude: '',
      destinationCountry: '',
      destinationCity: '',
      destinationStreet: '',
      destinationHouse: '',
      price: '',
      totalDistance: '',
      invoiceId: this.props.invoice.id,
      invoiceNumber: this.props.invoice.number,
      invoiceDate: this.props.invoice.registerDate,
      customerCompany: this.props.invoice.customerCompany,
      driverFullName: this.props.invoice.driverFullName,
      checkPoints: [],
      idTruckingCompany: this.props.invoice.truckingCompanyId,
      departureAddress: '',
      destinationAddress: ''
    });
    this.context.router.push('/waybill');
  }

  cancel() {
    if (this.props.userRole === Role.DISPATCHER) {
      this.context.router.push('/customer');
    } else if (this.props.userRole === Role.MANAGER) {
      this.context.router.push('/invoice');
    }
    this.props.cancelOperation();
  }

  create() {
    if (Array.isArray(this.props.invoice.products) && this.props.invoice.products.length) {
      this.props.clearProducts();
      this.props.createInvoice(this.props.invoice);
      this.cancel();
    } else {
      setValidationFail('Can\'t save invoice without products!' + '<br>' + 'Please add products to invoice.');
    }
  }

  render() {

    Formsy.addValidationRule('isRequiredSelect', function(values, value) {
      return value !== DEFAULT_SELECT_VALUE;
    });

    Formsy.addValidationRule('isWaybillNumber', function(values, value) {
      return (/^[а-яА-ЯёЁa-zA-Z0-9]+-?[а-яА-ЯёЁa-zA-Z0-9]*$/.test(value));
    });

    let editingLabel = <span> Editing invoice № <b> {this.props.invoice.number} </b></span>;
    let creatingLabel = <span>Create new invoice</span>;

    let role = this.props.userRole;

    let managerActions =
      <div className='btn-group float-right' role='group'>
        <button type='button'
                className={`btn btn-primary`}
                onClick={this.save.bind(this)}> OK </button>
      </div>;

    let dispatcherActions =
      <div className='btn-group float-right' role='group'>
        <button type='button'
                className={`btn btn-primary`}
                onClick={this.create.bind(this)}
                disabled={!this.state.canSubmit}> Create </button>
      </div>;

    let disableEditing = role !== Role.DISPATCHER;
    const defaultDriver = this.props.invoice.driverId ? this.props.invoice.driverId : DEFAULT_SELECT_VALUE;
    const defaultCar = this.props.invoice.carId ? this.props.invoice.carId : DEFAULT_SELECT_VALUE;
    const defaultDestination = this.props.invoice.destinationCustomerCompanyId
      ? this.props.invoice.destinationCustomerCompanyId : DEFAULT_SELECT_VALUE;

    let dispatcherSelects =
      <div>
        <ValidatedSelect id='destinationCustomerCompanyId'
                         label='Destination customer'
                         onChange={this.handleDestinationCustomerChange.bind(this)}
                         options={this.props.destinationCustomers.map((customer)=>{return ( <option value={customer.id}> {customer.name}, {customer.city} </option> )})}
                         value={defaultDestination}
                         disabled={disableEditing}
                         name='destinationCustomerCompanyId'
                         title='Destination customer'
                         validations='isRequiredSelect'/>

        <ValidatedSelect id='driverId'
                         label='Driver'
                         onChange={this.handleDriverChange.bind(this)}
                         options={this.props.users.map((driver)=>{return ( <option value={driver.id}> {driver.name} {driver.surname} </option> )})}
                         value={defaultDriver}
                         disabled={disableEditing}
                         name='driverId'
                         title='Driver'
                         validations='isRequiredSelect'/>

        <ValidatedSelect id='carId'
                         label='Car'
                         onChange={this.handleCarChange.bind(this)}
                         options={this.props.cars.map((car)=>{return (
                           <option value={car.id}> {car.number}, {sentenceCase(car.type)} </option>
                         )})}
                         value={defaultCar}
                         disabled={disableEditing}
                         name='carId'
                         title='Car'
                         validations='isRequiredSelect'/>
      </div>;

    let userActions = null;
    userActions = role === Role.MANAGER ? managerActions : userActions;
    userActions = role === Role.DISPATCHER ? dispatcherActions : userActions;
    dispatcherSelects = role === Role.DISPATCHER ? dispatcherSelects : null;

    let customerInfo = role === Role.DISPATCHER
      ? this.props.invoice.customerCompany + ', ' + this.props.invoice.customerCompanyCity : this.props.invoice.customerCompany;


    let dateValue = null;
    if(role !== Role.DISPATCHER) {
      dateValue = getDateString(this.props.invoice.registerDate);
    } else {
      dateValue = getDateString();
    }

    return (
      <div>
        <Formsy.Form className='form-horizontal' onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)}>
          <fieldset>
            <legend>{this.props.invoice.id ? editingLabel : creatingLabel} </legend>
            <div> Customer company ID <b> {this.props.invoice !== null ? this.props.invoice.customerCompanyId || '' : ''} </b> </div>
            <div> Customer company <b> {this.props.invoice !== null ? this.props.invoice.customerCompany || '' : ''} </b> </div>

            <ValidatedInput id='number'
                            type='text'
                            placeholder=''
                            value={this.props.invoice !== null ? this.props.invoice.number || '' : ''}
                            onChange={this.handleNumberChange.bind(this)}
                            readOnly={disableEditing}
                            title='Invoice number'
                            name='number'
                            required
                            validations={{
                              isWaybillNumber: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isWaybillNumber: VALIDATION_ERRORS.LETTERS_DIGITS_HYPHEN,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedInput id='registerDate'
                            type='text'
                            placeholder=''
                            value={dateValue}
                            onChange={this.handleRegisterDate.bind(this)}
                            readOnly={true}
                            name='registerDate'
                            title='Register date'/>

            <ValidatedInput id='customerCompany'
                            type='text'
                            placeholder=''
                            value={this.props.invoice !== null ? customerInfo || '' : ''}
                            onChange={this.handleCustomerCompany.bind(this)}
                            readOnly={true}
                            name='customerCompany'
                            title='Customer company'/>

            {dispatcherSelects}
            <div className='btn-toolbar text-center'>
              <div className='btn-group' role='group'>
                <button type='button'
                        className='btn btn-success'
                        onClick={this.cancel.bind(this)}>Close</button>
              </div>
              {userActions}
            </div>
          </fieldset>
        </Formsy.Form>
      </div>
    );
  }
}

InvoiceForm.propTypes = {
  invoice: React.PropTypes.object.isRequired,
  updateInvoice: React.PropTypes.func.isRequired,
  createInvoice: React.PropTypes.func.isRequired,
  updateOperation: React.PropTypes.func.isRequired,
  cancelOperation: React.PropTypes.func.isRequired,
  userRole: React.PropTypes.String
};

InvoiceForm.contextTypes = {
  router: React.PropTypes.func
};

let mapStateToProps = function (state) {
  return {
    userRole: state.userRole.userRole,
    users: state.users.users,
    cars: state.cars.cars,
    destinationCustomers: state.customers.customers
  };
};

function mapDispatchToProps(dispatch) {
  return {
    updateInvoice: bindActionCreators(updateInvoice, dispatch),
    createInvoice: bindActionCreators(createInvoice, dispatch),
    startOperation: bindActionCreators(startOperation, dispatch),
    updateOperation: bindActionCreators(updateOperation, dispatch),
    cancelOperation: bindActionCreators(cancelOperation, dispatch),
    loadFreeDrivers: bindActionCreators(loadFreeDrivers, dispatch),
    loadFreeCars: bindActionCreators(loadFreeCars, dispatch),
    loadAllCustomers: bindActionCreators(loadCustomers, dispatch),
    clearProducts: bindActionCreators(clearProducts, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);
