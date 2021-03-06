import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCar, createCar } from '../../actions/car.action';
import { updateOperation, resetOperation, cancelOperation } from '../../actions/operation.action';
import ValidatedInput from '../common/input';
import ValidatedSelect from '../common/select';
import Formsy from 'formsy-react';
import { Role } from '../../constants/roles'
import { sentenceCase } from 'change-case';
import { DEFAULT_SELECT_VALUE, VALIDATION_ERRORS, MAX_LENGTH_OF_STRING,
  MAX_LENGTH_OF_NUMERIC } from '../../constants/constants';

class CarForm extends React.Component {

  constructor() {
    super();
    this.state = {
      errors: {},
      canSubmit: false
    };
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  handleNumberChange(event) {
    this.props.updateOperation('number', event.target.value);
  }

  handleBrandChange(event) {
    this.props.updateOperation('brand', event.target.value);
  }

  handleModelChange(event) {
    this.props.updateOperation('model', event.target.value);
  }

  handleFuelConsumptionChange(event) {
    this.props.updateOperation('fuelConsumption', event.target.value);
  }

  handleTypeChange(event) {
    this.props.updateOperation('type', event.target.value);
  }

  save() {
    if (this.props.car.id) {
      this.props.updateCar(this.props.car);
    } else {
      this.props.createCar(this.props.car);
    }
  }

  reset() {
    this.props.resetOperation();
  }

  cancel() {
    this.props.cancelOperation();
  }

  render() {
    Formsy.addValidationRule('isRequiredSelect', function(values, value) {
      return value !== DEFAULT_SELECT_VALUE;
    });

    Formsy.addValidationRule('isName', function(values, value) {
      return !(/(\s){2,}/g.test(value));
    });

    let editingLabel = <span> Editing of <b> {this.props.car.number} </b> car </span>;
    let creatingLabel = <span>Create new car</span>;
    const disabledClass = this.props.changes ? '' : 'disabled';
    const defaultType = this.props.car.type ? this.props.car.type : DEFAULT_SELECT_VALUE;

    let adminActions =
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
      </div>;

    let ownerActions =
      <div className='btn-toolbar text-center'>
        <div className='btn-group' role='group'>
          <button type='button'
                  className='btn btn-primary'
                  onClick={this.cancel.bind(this)}> Close </button>
        </div>
      </div>;

    let userActions = null;
    let role = this.props.userRole;
    userActions = role === Role.ADMIN ? adminActions : userActions;
    userActions = role === Role.COMPANY_OWNER ? ownerActions : userActions;
    let disableEditing = role !== Role.ADMIN;

    return (
      <div>
        <Formsy.Form className='form-horizontal'
                     onValid={this.enableButton.bind(this)}
                     onInvalid={this.disableButton.bind(this)}>
          <fieldset>
            <legend>{this.props.car.id ? editingLabel : creatingLabel} </legend>
            <ValidatedInput id='number'
                            type='text'
                            title='Car number'
                            placeholder='Enter number here'
                            name='number'
                            required
                            value={this.props.car.number || ''}
                            onChange={this.handleNumberChange.bind(this)}
                            readOnly={disableEditing}
                            validations={{
                              isName: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isName: VALIDATION_ERRORS.TO_MUCH_SPACES_IN_A_ROW,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedInput id='brand'
                            type='text'
                            title='Car brand'
                            placeholder='Enter brand here'
                            name='brand'
                            required
                            value={this.props.car.brand  || ''}
                            onChange={this.handleBrandChange.bind(this)}
                            readOnly={disableEditing}
                            validations={{
                              isName: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isName: VALIDATION_ERRORS.TO_MUCH_SPACES_IN_A_ROW,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedInput id='model'
                            type='text'
                            title='Car model'
                            placeholder='Enter model here'
                            name='model'
                            required
                            value={this.props.car.model  || ''}
                            onChange={this.handleModelChange.bind(this)}
                            readOnly={disableEditing}
                            validations={{
                              isName: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isName: VALIDATION_ERRORS.TO_MUCH_SPACES_IN_A_ROW,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedInput id='fuelConsumption'
                            type='text'
                            title='Fuel consumption, L/100km'
                            placeholder='Enter fuel consumption here'
                            name='fuelConsumption'
                            value={this.props.car.fuelConsumption.toString()  || ''}
                            onChange={this.handleFuelConsumptionChange.bind(this)}
                            readOnly={disableEditing}
                            validations={{
                              isNumeric: true,
                              maxLength: MAX_LENGTH_OF_NUMERIC
                            }}
                            required
                            validationErrors={{
                              isNumeric: VALIDATION_ERRORS.DIGITS,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_NUMERIC
                            }}/>

            <ValidatedSelect id='Type'
                             title='Type'
                             name='type'
                             onChange={this.handleTypeChange.bind(this)}
                             value={defaultType}
                             options={this.props.carTypes.map(type => {return (
                               <option key={type} value={type}> {sentenceCase(type)} </option>
                             )})}
                             disabled={disableEditing}
                             validations='isRequiredSelect'/>

            {userActions}
          </fieldset>
        </Formsy.Form>
      </div>
    );
  }
}

CarForm.propTypes = {
  car: React.PropTypes.object.isRequired,
  changes: React.PropTypes.bool,
  createCar: React.PropTypes.func.isRequired,
  updateCar: React.PropTypes.func.isRequired,
  updateOperation: React.PropTypes.func.isRequired,
  resetOperation: React.PropTypes.func.isRequired,
  cancelOperation: React.PropTypes.func.isRequired,
  carTypes: React.PropTypes.array.isRequired
};

let mapStateToProps = function (state) {
  return {
    carTypes: state.carTypes.carTypes,
    userRole: state.userRole.userRole
  };
};

function mapDispatchToProps(dispatch) {
  return {
    createCar: bindActionCreators(createCar, dispatch),
    updateCar: bindActionCreators(updateCar, dispatch),
    updateOperation: bindActionCreators(updateOperation, dispatch),
    resetOperation: bindActionCreators(resetOperation, dispatch),
    cancelOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarForm);

