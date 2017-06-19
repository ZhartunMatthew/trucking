import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCustomerCompany, makeNewCustomerCompany } from '../../actions/customer.action';
import { updateOperation, resetOperation, cancelOperation } from '../../actions/operation.action';
import { Role } from '../../constants/roles';
import ValidatedInput from '../common/input';
import Formsy from 'formsy-react';
import { VALIDATION_ERRORS, MAX_LENGTH_OF_STRING } from '../../constants/constants';

class CustomerForm extends React.Component {

  constructor() {
    super();
    this.showCreateInvoiceFrom = this.showCreateInvoiceFrom.bind(this);
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

    Formsy.addValidationRule('isStreet', function(values, value) {
      return (/^[а-яА-ЯёЁa-zA-Z0-9]+\s*[а-яА-ЯёЁa-zA-Z0-9]*-?\.?\s*\/*[а-яА-ЯёЁa-zA-Z0-9]*$/.test(value));
    });

    Formsy.addValidationRule('isCompany', function(values, value) {
      return (/^[а-яА-ЯёЁa-zA-Z0-9]+\s*_*[а-яА-ЯёЁa-zA-Z0-9]*-?\.?\s*\/*[а-яА-ЯёЁa-zA-Z0-9]*$/.test(value));
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

    let editingLabel = <span> Editing of <b> {this.props.customer.name} </b> company </span>;
    let creatingLabel = <span>Create new company</span>;
    const disabledClass = this.props.changes ? '' : 'disabled';

    let adminActions =
      <div className='btn-toolbar text-center'>
        <div className='btn-group' role='group'>
          <button type='button'
                  className='btn btn-success'
                  onClick={this.cancel.bind(this)}> Close </button>

          <button type='button'
                  className={`${disabledClass} btn btn-default`}
                  onClick={this.props.changes ? this.reset.bind(this) : null}> Reset </button>

          <button type='button'
                  className={`${disabledClass} btn btn-primary`}
                  onClick={this.props.changes ? this.save.bind(this) : null}
                  disabled={!this.state.canSubmit}> Save </button>
        </div>
      </div>;

    let dispatcherActions =
      <div className='btn-toolbar text-center'>
        <div className='btn-group' role='group'>
          <button type='button'
                  className='btn btn-primary'
                  onClick={this.showCreateInvoiceFrom.bind(this)}> Create invoice </button>

          <button type='button'
                  className='btn btn-success'
                  onClick={this.cancel.bind(this)}> Close </button>

        </div>
      </div>;

    let ownerActions =
      <div className='btn-toolbar text-center'>
        <div className='btn-group' role='group'>
          <button type='button'
                  className='btn btn-success'
                  onClick={this.cancel.bind(this)}> Close </button>
        </div>
      </div>;

    let userActions = null;
    let role = this.props.userRole;
    userActions = role === Role.ADMIN ? adminActions : userActions;
    userActions = role === Role.DISPATCHER ? dispatcherActions : userActions;
    userActions = role === Role.COMPANY_OWNER ? ownerActions : userActions;
    let disableEditing = role !== Role.ADMIN;

    return (
      <div>
        <Formsy.Form className='form-horizontal' onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)}>
          <fieldset>
            <legend> {this.props.customer.id ? editingLabel : creatingLabel} </legend>
            <ValidatedInput id='name'
                            type='text'
                            placeholder='Enter company name here'
                            value={this.props.customer.name || ''}
                            onChange={this.handleNameChange.bind(this)}
                            readOnly={disableEditing}
                            name='name'
                            title='Company name'
                            required
                            validations={{
                              isCompany: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isCompany: VALIDATION_ERRORS.LETTERS_DIGITS_HYPHEN_UNDERSCORE_DOT_SPACE_SLASH,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedInput id='taxpayerNumber'
                            type='text'
                            placeholder='Enter taxpayer number here'
                            value={this.props.customer.taxpayerNumber  || ''}
                            onChange={this.handleTaxpayerNumberChange.bind(this)}
                            readOnly={disableEditing}
                            name='taxpayerNumber'
                            title='Taxpayer number'
                            required
                            validations={{
                              isLetterOrNumber: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isLetterOrNumber: VALIDATION_ERRORS.LETTERS_DIGITS,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedInput id='country'
                            type='text'
                            placeholder='Enter country here'
                            value={this.props.customer.country  || ''}
                            onChange={this.handleCountryChange.bind(this)}
                            readOnly={disableEditing}
                            name='country'
                            title='Country'
                            required
                            validations={{
                              isCountryCity: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isCountryCity: VALIDATION_ERRORS.LETTERS_DIGITS_HYPHEN_SPACE,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedInput id='city'
                            type='text'
                            placeholder='Enter city here'
                            value={this.props.customer.city  || ''}
                            onChange={this.handleCityChange.bind(this)}
                            readOnly={disableEditing}
                            name='city'
                            title='City'
                            required
                            validations={{
                              isCountryCity: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isCountryCity: VALIDATION_ERRORS.LETTERS_DIGITS_HYPHEN_SPACE,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedInput id='street'
                            type='text'
                            placeholder='Enter street here'
                            value={this.props.customer.street  || ''}
                            onChange={this.handleStreetChange.bind(this)}
                            readOnly={disableEditing}
                            name='street'
                            title='Street'
                            required
                            validations={{
                              isStreet: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isStreet: VALIDATION_ERRORS.LETTERS_DIGITS_HYPHEN_UNDERSCORE_DOT_SPACE_SLASH,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedInput id='house'
                            type='text'
                            placeholder='Enter house here'
                            value={this.props.customer.house  || ''}
                            onChange={this.handleHouseChange.bind(this)}
                            readOnly={disableEditing}
                            name='house'
                            title='House'
                            required
                            validations={{
                              isHouseFlat: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isHouseFlat: VALIDATION_ERRORS.LETTERS_DIGITS_SLASH,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            {userActions}
          </fieldset>
        </Formsy.Form>
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

