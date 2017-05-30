import React from 'react';
import Input from '../common/text-input';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCustomerCompany, makeNewCustomerCompany } from '../../actions/customer.action';
import { updateOperation, resetOperation, cancelOperation } from '../../actions/operation.action';

class CustomerForm extends React.Component {

  constructor() {
    super();
    this.showCreateInvoiceFrom = this.showCreateInvoiceFrom.bind(this);
  }

  handleNameChange(event) {
    this.props.updateOperation('name', event.target.value);
  }

  handleTaxpayerNumberChange(event) {
    this.props.updateOperation('taxpayerNumber', event.target.value);
  }

  handleCountryChange(event) {
    this.props.updateOperation('country', event.target.value);
  }

  handleCityChange(event) {
    this.props.updateOperation('city', event.target.value);
  }

  handleStreetChange(event) {
    this.props.updateOperation('street', event.target.value);
  }

  handleHouseChange(event) {
    this.props.updateOperation('house', event.target.value);
  }

  save() {
    if (this.props.customer.id) {
      this.props.updateCustomer(this.props.customer);
    } else {
      this.props.createCustomer(this.props.customer);
    }
  }

  reset() {
    this.props.resetOperation();
  }

  cancel() {
    this.props.cancelOperation();
  }

  showCreateInvoiceFrom() {
    this.context.router.push("/invoice");
  }

  render() {
    let editingLabel = <span> Editing of <b> {this.props.customer.name} </b> company </span>;
    let creatingLabel = <span>Create new company</span>;
    const disabledClass = this.props.changes ? '' : 'disabled';

    let adminActions =
      <div className='btn-toolbar text-center'>
        <div className='btn-group' role='group'>
          <button type='button' className='btn btn-success'
                  onClick={this.cancel.bind(this)}>Close
          </button>
          <button type='button' className={`${disabledClass} btn btn-default`}
                  onClick={this.props.changes ? this.reset.bind(this) : null}>Reset
          </button>
          <button type='button' className={`${disabledClass} btn btn-primary`}
                  onClick={this.props.changes ? this.save.bind(this) : null}>Save
          </button>
        </div>
      </div>;

    let dispatcherActions =
      <div className='btn-toolbar text-center'>
        <div className='btn-group' role='group'>
          <button type='button' className='btn btn-primary' onClick={this.showCreateInvoiceFrom.bind(this)}> Create invoice </button>
          <button type='button' className='btn btn-success' onClick={this.cancel.bind(this)}> Close </button>
        </div>
      </div>;

    let ownerActions =
      <div className='btn-toolbar text-center'>
        <div className='btn-group' role='group'>
          <button type='button' className='btn btn-success' onClick={this.cancel.bind(this)}> Close </button>
        </div>
      </div>;

    let userActions = null;
    let role = this.props.userRole;
    userActions = role === "ADMIN" ? adminActions : userActions;
    userActions = role === "DISPATCHER" ? dispatcherActions : userActions;
    userActions = role === "COMPANY_OWNER" ? ownerActions : userActions;
    let disableEditing = role !== "ADMIN";

    return (
      <div>
        <form className='form-horizontal'>
          <fieldset>
            <legend> {this.props.customer.id ? editingLabel : creatingLabel} </legend>
            <Input id='name' type='text' label='Company name' placeholder='Enter company name here'
                   value={this.props.customer.name || ''} onChange={this.handleNameChange.bind(this)} readOnly={disableEditing}/>
            <Input id='taxpayerNumber' type='text' label='Taxpayer number' placeholder='Enter taxpayer number here'
                   value={this.props.customer.taxpayerNumber  || ''} onChange={this.handleTaxpayerNumberChange.bind(this)} readOnly={disableEditing}/>
            <Input id='country' type='text' label='country' placeholder='Enter country here'
                   value={this.props.customer.country  || ''} onChange={this.handleCountryChange.bind(this)} readOnly={disableEditing}/>
            <Input id='city' type='text' label='city' placeholder='Enter city here'
                   value={this.props.customer.city  || ''} onChange={this.handleCityChange.bind(this)} readOnly={disableEditing}/>
            <Input id='street' type='text' label='street' placeholder='Enter street here'
                   value={this.props.customer.street  || ''} onChange={this.handleStreetChange.bind(this)} readOnly={disableEditing}/>
            <Input id='house' type='text' label='house' placeholder='Enter house here'
                   value={this.props.customer.house  || ''} onChange={this.handleHouseChange.bind(this)} readOnly={disableEditing}/>
            {userActions}
          </fieldset>
        </form>
      </div>
    );
  }
}

CustomerForm.propTypes = {
  customer: React.PropTypes.object.isRequired,
  changes: React.PropTypes.bool,
  createCustomer: React.PropTypes.func.isRequired,
  updateCustomer: React.PropTypes.func.isRequired,
  updateOperation: React.PropTypes.func.isRequired,
  resetOperation: React.PropTypes.func.isRequired,
  cancelOperation: React.PropTypes.func.isRequired,
  userRole: React.PropTypes.String
};

CustomerForm.contextTypes = {
  router: React.PropTypes.func
};

let mapStateToProps = function (state) {
  return {
    userRole: state.userRole.userRole
  };
};

function mapDispatchToProps(dispatch) {
  return {
    createCustomer: bindActionCreators(makeNewCustomerCompany, dispatch),
    updateCustomer: bindActionCreators(updateCustomerCompany, dispatch),
    updateOperation: bindActionCreators(updateOperation, dispatch),
    resetOperation: bindActionCreators(resetOperation, dispatch),
    cancelOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);

