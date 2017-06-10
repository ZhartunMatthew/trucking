import React from 'react';
import Input from '../common/text-input';
import Select from '../common/select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateInvoice, createInvoice } from '../../actions/invoice.action';
import {loadFreeDrivers, loadFreeCars } from '../../actions/availiable.action';
import { updateOperation, cancelOperation } from '../../actions/operation.action';


class InvoiceForm extends React.Component {

  constructor() {
    super();
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    if (this.props.userRole === 'DISPATCHER') {
      this.props.loadFreeDrivers();
      this.props.loadFreeCars(true);
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

  handleDriverChange(event) {
    this.props.updateOperation('driverId', event.target.value);
  }

  handleCarChange(event) {
    this.props.updateOperation('carId', event.target.value);
  }

  save() {
    this.props.updateInvoice(this.props.invoice);
    this.props.onSubmit();
  }

  cancel() {
    this.context.router.push('/');
    this.props.cancelOperation();
  }

  create() {
    this.props.createInvoice(this.props.invoice);
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

    const defaultDriver = this.props.invoice.driverId ? this.props.invoice.driverId : [];
    const defaultCar = this.props.invoice.carId ? this.props.invoice.carId : [];
    let dispatcherSelects =
      <div>
        <Select id="driverId" label="driver" onChange={this.handleDriverChange.bind(this)}
                options={this.props.users.map((driver)=>{return ( <option value={driver.id}> {driver.surname} </option> )})}
                value={defaultDriver} />
        <Select id="carId" label="car" onChange={this.handleCarChange.bind(this)}
                options={this.props.cars.map((car)=>{return ( <option value={car.id}> {car.number},{car.type.description} </option> )})}
                value={defaultCar} />
      </div>

    let userActions = null;
    userActions = role === "MANAGER" ? managerActions : userActions;
    userActions = role === "DISPATCHER" ? dispatcherActions : userActions;
    dispatcherSelects = role === "DISPATCHER" ? dispatcherSelects : null;
    let disableEditing = role !== "DISPATCHER";
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
                   value={this.props.invoice !== null ? this.props.invoice.customerCompany || '' : ''} onChange={this.handleCustomerCompany.bind(this)}
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
  userRole: React.PropTypes.String,
  onSubmit: React.PropTypes.func.isRequired
};

InvoiceForm.contextTypes = {
  router: React.PropTypes.func
};

let mapStateToProps = function (state) {
  return {
    userRole: state.userRole.userRole,
    users: state.users.users,
    cars: state.cars.cars
  };
};

function mapDispatchToProps(dispatch) {
  return {
    updateInvoice: bindActionCreators(updateInvoice, dispatch),
    createInvoice: bindActionCreators(createInvoice, dispatch),
    updateOperation: bindActionCreators(updateOperation, dispatch),
    cancelOperation: bindActionCreators(cancelOperation, dispatch),
    loadFreeDrivers: bindActionCreators(loadFreeDrivers, dispatch),
    loadFreeCars: bindActionCreators(loadFreeCars, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);
