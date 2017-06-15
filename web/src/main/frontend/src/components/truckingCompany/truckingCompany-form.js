import React from 'react';
import Input from '../common/text-input';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTruckingCompany, makeNewTruckingCompany } from '../../actions/truckingCompany.action';
import { updateOperation, resetOperation, cancelOperation } from '../../actions/operation.action';
import MyInput from '../common/input';
import MySelect from '../common/select-component';
import Formsy from 'formsy-react';
import { setActionDescription } from '../../actions/modal.action';

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
    let action = "";
    let description = "";
    if (this.props.truckingCompany.id) {
      this.props.updateTruckingCompany(this.props.truckingCompany);
      action = "Изменения грузоперевозчика!";
      description = "Информация о грузоперевозчике <b>" + this.props.truckingCompany.name + "</b> была изменена";
    } else {
      this.props.createTruckingCompany(this.props.truckingCompany);
      action = "Новый грузоперевозчик!";
      description = "Грузоперевозчик <b>" + this.props.truckingCompany.name + "</b> успешно добавлен";
    }
    setActionDescription(action, description);
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
            <MyInput id='name' type='text' label='Company name' placeholder='Enter company name here'
                   value={this.props.truckingCompany.name || ''} onChange={this.handleNameChange.bind(this)}
                    name='name' title='Company name' required validations="isCompany" validationError='Allowable characters:letters, numbers,-,space,.,/'/>
            <MyInput id='taxpayerNumber' type='text' label='Taxpayer number' placeholder='Enter taxpayer number here'
                    value={this.props.truckingCompany.taxpayerNumber  || ''} onChange={this.handleTaxpayerNumberChange.bind(this)}
                      name='taxpayerNumber' title='Taxpayer number' required validations="isLetterOrNumber" validationError='Allowable characters letters and numbers'/>
            <MyInput id='country' type='text' label='Country' placeholder='Enter country here'
                   value={this.props.truckingCompany.country  || ''} onChange={this.handleCountryChange.bind(this)}
                      name='country' title='Country' required validations='isCountryCity' validationError='Allowable characters:letters, numbers,-,space'/>
            <MyInput id='city' type='text' label='City' placeholder='Enter city here'
                   value={this.props.truckingCompany.city  || ''} onChange={this.handleCityChange.bind(this)}
                      name='city' title='City' required validations='isCountryCity' validationError='Allowable characters:letters, numbers,-,space'/>
            <MyInput id='street' type='text' label='Street' placeholder='Enter street here'
                   value={this.props.truckingCompany.street  || ''} onChange={this.handleStreetChange.bind(this)}
                      name='street' title='Street' required validations='isStreet' validationError='Allowable characters:letters, numbers,-,space,.,/'/>
            <MyInput id='house' type='text' label='House' placeholder='Enter house here'
                   value={this.props.truckingCompany.house  || ''} onChange={this.handleHouseChange.bind(this)}
                    name='house' title='House' required validations='isHouseFlat' validationError='Allowable characters:letters, numbers, /'/>

            <div className='btn-toolbar text-center'>
              <div className='btn-group' role='group'>
                <button type='button'
                        className='btn btn-success'
                        onClick={this.cancel.bind(this)}> Close </button>

              </div>
              <div className='btn-group float-right' role='group'>
                <button type='button'
                        className={`${disabledClass} btn btn-default`}
                        onClick={this.props.changes ? this.reset.bind(this) : null}> Reset </button>

                <button type='button'
                        className={`${disabledClass} btn btn-primary`}
                        onClick={this.props.changes ? this.save.bind(this) : null}
                        disabled={!this.state.canSubmit}
                        data-toggle="modal"
                        data-target="#modal-action"> Save </button>
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
