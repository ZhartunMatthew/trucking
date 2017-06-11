import React from 'react';
import Select from '../common/select';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCar, makeNewCar } from '../../actions/car.action';
import { updateOperation, resetOperation, cancelOperation } from '../../actions/operation.action';
import Formsy from 'formsy-react';
import MyInput from '../common/input';



class CarForm extends React.Component {

  constructor() {
    super();

    this.state = {
      errors: {}
    };
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
    let editingLabel = <span> Editing of <b> {this.props.car.number} </b> car </span>;
    let creatingLabel = <span>Create new car</span>;
    const disabledClass = this.props.changes ? '' : 'disabled';
    const defaultType = this.props.car.type ? this.props.car.type : [];

    let adminActions =
      <div className='btn-toolbar text-center'>
        <div className='btn-group' role='group'>
          <button type='button' className='btn btn-success' onClick={this.cancel.bind(this)}>Close</button>
        </div>
        <div className='btn-group float-right' role='group'>
          <button type='button' className={`${disabledClass} btn btn-default`}
                  onClick={this.props.changes ? this.reset.bind(this) : null}>Reset
          </button>
          <button type='button' className={`${disabledClass} btn btn-primary`}
                  onClick={this.props.changes ? this.save.bind(this) : null}>Save
          </button>
        </div>
      </div>;

    let ownerActions =
      <div className='btn-toolbar text-center'>
        <div className='btn-group' role='group'>
          <button type='button' className='btn btn-success' onClick={this.cancel.bind(this)}>Close</button>
        </div>
      </div>;

    let userActions = null;
    let role = this.props.userRole;
    userActions = role === "ADMIN" ? adminActions : userActions;
    userActions = role === "COMPANY_OWNER" ? ownerActions : userActions;
    let disableEditing = role !== "ADMIN";

    return (
      <div>
        <Formsy.Form className='form-horizontal'>
          <fieldset>
            <legend>{this.props.car.id ? editingLabel : creatingLabel} </legend>
            <MyInput id='number' type='text' label='Car number' placeholder='Enter number here' name="number" title="Number"
                   value={this.props.car.number || ''} onChange={this.handleNumberChange.bind(this)} readOnly={disableEditing} required/>
            <MyInput id='brand' type='text' label='Car brand' placeholder='Enter brand here' required name="brand" title="Brand"
                   value={this.props.car.brand  || ''} onChange={this.handleBrandChange.bind(this)} readOnly={disableEditing}/>
            <MyInput id='model' type='text' label='Car model' placeholder='Enter model here' required name="model" title="Model"
                   value={this.props.car.model  || ''} onChange={this.handleModelChange.bind(this)} readOnly={disableEditing}/>
            <MyInput id='fuelConsumption' type='text' onChange={this.handleFuelConsumptionChange.bind(this)} placeholder='Enter fuel consumption here' required title="Fuel consumption"
                   value={this.props.car.fuelConsumption  || ''}  readOnly={disableEditing}
                   validations={{isNumeric: true, maxLength: 10}} name="fuelConsumption" validationError="This field must be a number"/>
            <Select id="type" label="Type" onChange={this.handleTypeChange.bind(this)}
                    options={this.props.carTypes.map((type)=>{return ( <option> {type} </option> )})}
                    value={defaultType} disabled={disableEditing}/>
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
    createCar: bindActionCreators(makeNewCar, dispatch),
    updateCar: bindActionCreators(updateCar, dispatch),
    updateOperation: bindActionCreators(updateOperation, dispatch),
    resetOperation: bindActionCreators(resetOperation, dispatch),
    cancelOperation: bindActionCreators(cancelOperation, dispatch)

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarForm);

