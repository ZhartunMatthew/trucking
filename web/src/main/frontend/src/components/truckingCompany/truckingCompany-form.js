import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTruckingCompany, makeNewTruckingCompany } from '../../actions/truckingCompany.action';
import { updateOperation, resetOperation, cancelOperation } from '../../actions/operation.action';
import ValidatedInput from '../common/input';
import Formsy from 'formsy-react';
import { VALIDATION_ERRORS, MAX_LENGTH_OF_STRING, MAX_LENGTH_OF_TAXPAYER_NUMBER } from '../../constants/constants';

class TruckingCompanyForm extends React.Component {

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
    if (this.props.truckingCompany.id) {
      this.props.updateTruckingCompany(this.props.truckingCompany);
    } else {
      this.props.createTruckingCompany(this.props.truckingCompany);
    }
  }

  reset() {
    this.props.resetOperation();
  }

  cancel() {
    this.props.cancelOperation();
  }

  render() {

    Formsy.addValidationRule('isCompany', function(values, value) {
      return (/^[а-яА-ЯёЁa-zA-Z0-9]+\s*_*[а-яА-ЯёЁa-zA-Z0-9]*-?\.?\s*\/*[а-яА-ЯёЁa-zA-Z0-9]*$/.test(value));
    });

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

    let editingLabel = <span> Editing of <b> {this.props.truckingCompany.name} </b> Company </span>;
    let creatingLabel = <span>Create new company</span>;
    const disabledClass = this.props.changes ? '' : 'disabled';
    return (
      <div>
        <Formsy.Form className='form-horizontal' onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)}>
          <fieldset>
            <legend>{this.props.truckingCompany.id ? editingLabel : creatingLabel} </legend>
            <ValidatedInput id='name'
                            type='text'
                            placeholder='Enter company name here'
                            value={this.props.truckingCompany.name || ''}
                            onChange={this.handleNameChange.bind(this)}
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
                            value={this.props.truckingCompany.taxpayerNumber  || ''}
                            onChange={this.handleTaxpayerNumberChange.bind(this)}
                            name='taxpayerNumber'
                            title='Taxpayer number'
                            required
                            validations={{
                              isLetterOrNumber: true,
                              maxLength: MAX_LENGTH_OF_TAXPAYER_NUMBER
                            }}
                            validationErrors={{
                              isLetterOrNumber: VALIDATION_ERRORS.LETTERS_DIGITS,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_TAXPAYER_NUMBER
                            }}/>

            <ValidatedInput id='country'
                            type='text'
                            placeholder='Enter country here'
                            value={this.props.truckingCompany.country  || ''}
                            onChange={this.handleCountryChange.bind(this)}
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
                            value={this.props.truckingCompany.city  || ''}
                            onChange={this.handleCityChange.bind(this)}
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
                            value={this.props.truckingCompany.street  || ''}
                            onChange={this.handleStreetChange.bind(this)}
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
                            value={this.props.truckingCompany.house  || ''}
                            onChange={this.handleHouseChange.bind(this)}
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

            <div className='btn-toolbar text-center'>
              <div className='btn-group' role='group'>
                <button type='button'
                        className={`${disabledClass} btn btn-success`}
                        onClick={this.props.changes ? this.save.bind(this) : null}
                        disabled={!this.state.canSubmit}> Save </button>
              </div>
              <div className='btn-group float-right' role='group'>
                <button type='button'
                        className={`${disabledClass} btn btn-default`}
                        onClick={this.props.changes ? this.reset.bind(this) : null}> Reset </button>
                <button type='button'
                        className='btn btn-primary'
                        onClick={this.cancel.bind(this)}> Close </button>
              </div>
            </div>
          </fieldset>
        </Formsy.Form>
      </div>
    );
  }
}

TruckingCompanyForm.propTypes = {
  truckingCompany: React.PropTypes.object.isRequired,
  changes: React.PropTypes.bool,
  createTruckingCompany: React.PropTypes.func.isRequired,
  updateTruckingCompany: React.PropTypes.func.isRequired,
  updateOperation: React.PropTypes.func.isRequired,
  resetOperation: React.PropTypes.func.isRequired,
  cancelOperation: React.PropTypes.func.isRequired
};

let mapStateToProps = function () {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    createTruckingCompany: bindActionCreators(makeNewTruckingCompany, dispatch),
    updateTruckingCompany: bindActionCreators(updateTruckingCompany, dispatch),
    updateOperation: bindActionCreators(updateOperation, dispatch),
    resetOperation: bindActionCreators(resetOperation, dispatch),
    cancelOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TruckingCompanyForm);
