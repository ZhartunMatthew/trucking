import React from 'react';
import Input from '../common/text-input';
import CheckBox from '../common/checkbox';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTruckingCompany, makeNewTruckingCompany } from '../../actions/truckingCompany.action';
import { updateOperation, resetOperation, cancelOperation } from '../../actions/operation.action';

class DriverWaybillsForm extends React.Component {

  handleNameChange(event) {
    this.props.updateOperation('departureCity', event.target.value);
  }

  save() {
    if (this.props.driverWaybill.id) {
      this.props.updateTruckingCompany(this.props.driverWaybill);
    } else {
      this.props.createTruckingCompany(this.props.driverWaybill);
    }
  }

  reset() {
    this.props.resetOperation();
  }

  cancel() {
    this.props.cancelOperation();
  }

  render() {
    let viewLabel = <span> Waybill №<b>{this.props.driverWaybill.waybillNumber}</b></span>;
    let checkLabel = <span>Current waybill </span>;
    const disabledClass = this.props.changes ? '' : 'disabled';
    let checkPoints = this.props.driverWaybill.checkPoints.map((checkPoint, index) => {
      return (
        <tr key={checkPoint.id}>
          <th scope='row'> {index + 1} </th>
          <td>
            {checkPoint.pathDate ? (
                <CheckBox className="checkPointBox" checked disabled/>
              ) : (
                <CheckBox className="checkPointBox"/>
              )
            }
          </td>
          <td> {checkPoint.description}</td>
          <td> {checkPoint.pathDate}</td>
        </tr>
      )
    });

    return (
      <div>
        <form className='form-horizontal'>
          <fieldset>
            <legend>
              {
                this.props.driverWaybill.waybillState.name === 'Transportation_completed' ? viewLabel : checkLabel
              }
            </legend>

            <Input id='departureCity' type='text' label='departureCity' placeholder='Enter departureCity here'
                   value={this.props.driverWaybill.departureCity || ''} onChange={this.handleNameChange.bind(this)}/>

            <div>
              <h1>Checkpoints</h1>
              <table className='table table-hover'>
                <thead>
                <tr>
                  <th>#</th>
                  <th>pass</th>
                  <th>description</th>
                  <th>pass date</th>
                </tr>
                </thead>
                <tbody>
                {checkPoints}
                <tr>
                  <th scope='row'> destination </th>
                  <td>
                    {this.props.driverWaybill.destinationDate ? (
                        <CheckBox className="checkPointBox" checked disabled/>
                      ) : (
                        <CheckBox className="checkPointBox"/>
                      )
                    }
                  </td>
                  <td> {this.props.driverWaybill.destinationCity}</td>
                  <td> {this.props.driverWaybill.destinationDate}</td>
                </tr>
                </tbody>
              </table>
            </div>

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

DriverWaybillsForm.propTypes = {
  driverWaybill: React.PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(DriverWaybillsForm);
