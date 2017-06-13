import React from 'react';
import Input from '../common/text-input';
import Select from '../common/select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateInvoice, createInvoice } from '../../actions/invoice.action';
import { loadFreeDrivers, loadFreeCars } from '../../actions/availiable.action';
import { startOperation, updateOperation, cancelOperation } from '../../actions/operation.action';
import { loadCustomers } from '../../actions/customer.action'
import { clearProducts } from '../../actions/product.action';

class InvoiceForm extends React.Component {

  constructor() {
    super();
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    if (this.props.userRole === 'DISPATCHER') {
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
    this.props.updateOperation('destinationCustomerCompanyId', event.target.value)
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
      departureCountry: '',
      departureCity: '',
      departureStreet: '',
      departureHouse: '',
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
      idTruckingCompany: this.props.invoice.truckingCompanyId
    });
    this.context.router.push('/waybill');
  }

  cancel() {
    if (this.props.userRole === 'COMPANY_OWNER'){
      this.props.cancelOperation();
    }else {
      this.context.router.push('/customer');
      this.props.cancelOperation();
    }
  }

  create() {
    this.props.clearProducts();
    this.props.createInvoice(this.props.invoice);
    this.cancel();
  }

  render() {

    let editingLabel = <span> Editing invoice № <b> {this.props.invoice.number} </b></span>;
    let creatingLabel = <span>Create new invoice</span>;

    let role = this.props.userRole;

    let managerActions =
      <div className='btn-group float-right' role='group'>
        <button type='button' className={`btn btn-primary`} onClick={this.save.bind(this)}> OK </button>
      </div>;

    let dispatcherActions =
      <div className='btn-group float-right' role='group'>
        <button type='button' className={`btn btn-primary`} onClick={this.create.bind(this)}> Create </button>
      </div>;
    let disableEditing = role !== "DISPATCHER";
    const defaultDriver = this.props.invoice.driverId ? this.props.invoice.driverId : [];
    const defaultCar = this.props.invoice.carId ? this.props.invoice.carId : [];
    const defaultDestination = this.props.invoice.destinationCustomerCompanyId ? this.props.invoice.destinationCustomerCompanyId : [];
    let dispatcherSelects =
      <div>
        <Select id="destinationCustomerCompanyId" label="Destination customer" onChange={this.handleDestinationCustomerChange.bind(this)}
                options={this.props.destinationCustomers.map((customer)=>{return ( <option value={customer.id}> {customer.name}, {customer.city} </option> )})}
                value={defaultDestination} disabled={disableEditing} />

        <Select id="driverId" label="driver" onChange={this.handleDriverChange.bind(this)}
                options={this.props.users.map((driver)=>{return ( <option value={driver.id}> {driver.name} {driver.surname} </option> )})}
                value={defaultDriver} disabled={disableEditing} />

        <Select id="carId" label="car" onChange={this.handleCarChange.bind(this)}
                options={this.props.cars.map((car)=>{return ( <option value={car.id}> {car.number}, {car.type} </option> )})}
                value={defaultCar} disabled={disableEditing} />
      </div>;

    let userActions = null;
    userActions = role === "MANAGER" ? managerActions : userActions;
    userActions = role === "DISPATCHER" ? dispatcherActions : userActions;
    dispatcherSelects = role === "DISPATCHER" ? dispatcherSelects : null;

    let customerInfo = role === "DISPATCHER"
      ? this.props.invoice.customerCompany + ', ' + this.props.invoice.customerCompanyCity : this.props.invoice.customerCompany;

    return (
      <div>
        <form className='form-horizontal'>
          <fieldset>
            <legend>{this.props.invoice.id ? editingLabel : creatingLabel} </legend>
            <div> Customer company ID <b> {this.props.invoice !== null ? this.props.invoice.customerCompanyId || '' : ''} </b> </div>
            <div> Customer company <b> {this.props.invoice !== null ? this.props.invoice.customerCompany || '' : ''} </b> </div>

            <Input id='number' type='text' label='Invoice number' placeholder=''
                   value={this.props.invoice !== null ? this.props.invoice.number || '' : ''} onChange={this.handleNumberChange.bind(this)}
                   readOnly={disableEditing}/>
            <Input id='registerDate' type='text' label='Register date' placeholder=''
                   value={this.props.invoice !== null ? this.props.invoice.registerDate || '' : ''} onChange={this.handleRegisterDate.bind(this)}
                   readOnly={true}/>
            <Input id='customerCompany' type='text' label='Customer company' placeholder=''
                   value={this.props.invoice !== null ? customerInfo || '' : ''} onChange={this.handleCustomerCompany.bind(this)}
                   readOnly={true}/>
            {dispatcherSelects}
            <div className='btn-toolbar text-center'>
              <div className='btn-group' role='group'>
                <button type='button' className='btn btn-success' onClick={this.cancel.bind(this)}>Close</button>
              </div>
              {userActions}
            </div>
          </fieldset>
        </form>
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
