import React from 'react';
import Input from '../common/text-input';
import CheckBox from '../common/checkbox';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkCheckPoint} from '../../actions/driverWaybills.action';
import { updateOperation, cancelOperation } from '../../actions/operation.action';

class DriverWaybillsForm extends React.Component {

  handleNameChange(event) {
    this.props.updateOperation('departureCity', event.target.value);
  }

  check(checkPoint) {
    this.props.checkCheckPoint(checkPoint);
  }

  cancel() {
    this.props.cancelOperation();
  }

  render() {
    let checkPoints = this.props.driverWaybill.checkPoints.map((checkPoint, index) => {
      return (
        <tr key={checkPoint.id}>
          <th scope='row'> {index + 1} </th>
          <td>
            {checkPoint.pathDate ? (
                <CheckBox className="checkPointBox" checked disabled/>
              ) : (
                <CheckBox className="checkPointBox" onChange={this.check.bind(this, checkPoint)}/>
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
            <legend><span> Waybill №<b>{this.props.driverWaybill.waybillNumber}</b></span></legend>
            <label><b>Departure date:</b></label>
            <p>{this.props.driverWaybill.departureDate}</p>
            <label><b>Departure place:</b></label>
            <p>{this.props.driverWaybill.departureCountry}, г.{this.props.driverWaybill.departureCity},
                    {this.props.driverWaybill.departureStreet}, д.{this.props.driverWaybill.departureHouse}</p>
            <label><b>Price:</b></label>
            <p>{this.props.driverWaybill.price}</p>
            <label><b>Total distance:</b></label>
            <p>{this.props.driverWaybill.totalDistance}</p>
            <div>
              <h3>Checkpoints {this.props.driverWaybill.allCheckPoints}/{this.props.driverWaybill.passedCheckPoints}</h3>
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
                  <td>{this.props.driverWaybill.destinationCountry}, г.{this.props.driverWaybill.destinationCity},
                    {this.props.driverWaybill.destinationStreet}, д.{this.props.driverWaybill.destinationHouse}</td>
                  <td>{this.props.driverWaybill.destinationDate}</td>
                </tr>
                </tbody>
              </table>
            </div>

            <div className='btn-toolbar text-center'>
              <div className='btn-group' role='group'>
                <button type='button' className='btn btn-primary' onClick={this.cancel.bind(this)}>Close</button>
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
  checkCheckPoint: React.PropTypes.func.isRequired,
  updateOperation: React.PropTypes.func.isRequired,
  cancelOperation: React.PropTypes.func.isRequired
};

let mapStateToProps = function () {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    checkCheckPoint: bindActionCreators(checkCheckPoint, dispatch),
    updateOperation: bindActionCreators(updateOperation, dispatch),
    cancelOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverWaybillsForm);
