import React from 'react';
import Input from '../common/text-input';
import Textarea from '../common/textarea';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTruckingCompany, makeNewTruckingCompany } from '../../actions/truckingCompany.action';
import { updateOperation, resetOperation, cancelOperation } from '../../actions/operation.action';

class TruckingCompanyForm extends React.Component {

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
    let editingLabel = <span> Editing of <b> {this.props.truckingCompany.name} </b> Company </span>;
    let creatingLabel = <span>Create new company</span>;
    const disabledClass = this.props.changes ? '' : 'disabled';
    return (
      <div>
        <form className='form-horizontal'>
          <fieldset>
            <legend>{this.props.truckingCompany.id ? editingLabel : creatingLabel} </legend>
            <Input id='name' type='text' label='Company name' placeholder='Enter company name here'
                   value={this.props.truckingCompany.name || ''} onChange={this.handleNameChange.bind(this)}/>
            <Input id='taxpayerNumber' type='text' label='Taxpayer number' placeholder='Enter taxpayer number here'
                    value={this.props.truckingCompany.taxpayerNumber  || ''} onChange={this.handleTaxpayerNumberChange.bind(this)}/>
            <Input id='country' type='text' label='country' placeholder='Enter country here'
                   value={this.props.truckingCompany.country  || ''} onChange={this.handleCountryChange.bind(this)}/>
            <Input id='city' type='text' label='city' placeholder='Enter city here'
                   value={this.props.truckingCompany.city  || ''} onChange={this.handleCityChange.bind(this)}/>
            <Input id='street' type='text' label='street' placeholder='Enter street here'
                   value={this.props.truckingCompany.street  || ''} onChange={this.handleStreetChange.bind(this)}/>
            <Input id='house' type='text' label='house' placeholder='Enter house here'
                   value={this.props.truckingCompany.house  || ''} onChange={this.handleHouseChange.bind(this)}/>

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
            </div>
          </fieldset>
        </form>
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
