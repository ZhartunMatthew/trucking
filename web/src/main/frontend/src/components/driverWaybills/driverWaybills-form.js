import React from 'react';
import CheckBox from '../common/checkbox';
import TextareaElement from '../common/textarea';
import ValidatedSelect from '../common/select-component';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { passCheckPoint, passDestination} from '../../actions/driverWaybills.action';
import { cancelOperation, updateOperation } from '../../actions/operation.action';
import ValidatedInput from '../common/input';
import Formsy from 'formsy-react';
import { VALIDATION_ERRORS, WAYBILL_STATE, DEFAULT_SELECT_VALUE } from '../../constants/constants';
import { sentenceCase } from 'change-case';
import { getDateString, reformatDate } from '../../constants/date.functions'


class DriverWaybillsForm extends React.Component {

  constructor() {
    super();

    this.state = {
      errors: {},
      canSubmit: true
    };
  }

  handleProductLostChange(id, product, event) {
    this.props.updateOperation("amountLost" + id, event.target.value);
    product.lostAmount = event.target.value;
  }

  handleProductDescChange(id, product, event) {
    this.props.updateOperation("descLost" + id, event.target.value);
    product.lostDescription = event.target.value;
  }

  handleProductTypeChange(id, product, event) {
    this.props.updateOperation("typeLost" + id, event.target.value);
    product.lostReason = event.target.value;
  }

  passCheckpoint(checkPoint) {
    this.props.passCheckPoint(checkPoint);
  }

  passDestination() {
    this.props.passDestination(this.props.products, this.props.driverWaybill.id);
  }

  cancel() {
    this.props.cancelOperation();
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

  render() {
    let indexOfEnabledCheckPoint = this.props.driverWaybill.checkPoints.findIndex(checkPoint => !checkPoint.pathDate);
    let checkPoints = this.props.driverWaybill.checkPoints.map((checkPoint, index) => {
      return (
        <tr key={checkPoint.id}>
          <th scope='row'> {index + 1} </th>
          <td>
            {checkPoint.pathDate ? (
                <CheckBox className="checkPointBox" checked disabled/>
              ) : indexOfEnabledCheckPoint !== index ? (
                <CheckBox className="checkPointBox" unchecked disabled/>
              ) : (
                <CheckBox className="checkPointBox" onChange={this.passCheckpoint.bind(this, checkPoint)}/>
              )
            }
          </td>
          <td> {checkPoint.description}</td>
          <td> {reformatDate(checkPoint.pathDate)}</td>
        </tr>
      )
    });

    Formsy.addValidationRule('isInBounds', function(values, value, args) {
      if(value === null || value.length === 0) {
        return true;
      }
      return Number(value) >= 0 && Number(value) <= args[0];
    });

    Formsy.addValidationRule('isRequiredSelect', function(values, value) {
      return value !== DEFAULT_SELECT_VALUE;
    });

    // let disableEditing = this.props.driverWaybill.waybillState === WAYBILL_STATE.TRANSPORTATION_COMPLETED;
    let products = this.props.products.map((product, index) => {
      let defType = product.lostReason ? product.lostReason : DEFAULT_SELECT_VALUE;
      let disableEditing = this.props.driverWaybill.waybillState === WAYBILL_STATE.TRANSPORTATION_COMPLETED || product.lostAmount <=0 || product.lostAmount > product.amount;
      let defaultType = disableEditing ? '' : defType;
      let disableProd = this.props.driverWaybill.waybillState === WAYBILL_STATE.TRANSPORTATION_COMPLETED;
      return (
        <tr key={product.id}>
          <th scope='row'> {index + 1} </th>
          <td>{product.name}</td>
          <td>{product.amount}</td>
          <td width="17%">
            <ValidatedInput id={"amountLost" + product.id}
                            title="Amount lost, u."
                            name={"amountLost" + product.id}
                            type="text"
                            value={product.lostAmount}
                            readOnly={disableProd}
                            onChange={this.handleProductLostChange.bind(this, product.id, product)}
                            required={false}
                            validations={{
                              isNumeric: true,
                              isInBounds: [product.amount]
                            }}
                            validationErrors={{
                              isNumeric: VALIDATION_ERRORS.DIGITS,
                              isInBounds: VALIDATION_ERRORS.OUT_OF_BOUNDS
                            }}/>
          </td>
            <td>
              <ValidatedSelect id={"typeLost" + product.id}
                               title="Reason lost"
                               name='reasonLostType'
                               value={defaultType}
                               disabled={disableEditing}
                               options={this.props.lostTypes.map(type => {return (
                                 <option key={type} value={type}> {sentenceCase(type)} </option>
                               )})}
                               onChange={this.handleProductTypeChange.bind(this, product.id, product)}
                               validations="isRequiredSelect"/>
            </td>
            <td>
            <TextareaElement id={"descLost" + product.id}
                             label="Description lost"
                             readOnly={disableEditing}
                             value={product.lostDescription}
                             rows={4}
                             maxLength={255}
                             onChange={this.handleProductDescChange.bind(this, product.id, product)}/>
            </td>
        </tr>
      )
    });
    return (
      <div>
        <form className='form-horizontal'>
          <fieldset>
            <legend>
              <span> Waybill № <b>{this.props.driverWaybill.waybillNumber} </b> </span>
            </legend>
            <label> <b> Departure place: </b>
            </label>
            <p>{this.props.driverWaybill.departureCountry}, г.{this.props.driverWaybill.departureCity},
                    {this.props.driverWaybill.departureStreet}, д.{this.props.driverWaybill.departureHouse}</p>
            <label>
              <b> Departure date: </b>
            </label>
            <p>{getDateString(this.props.driverWaybill.departureDate)}</p>

            <label>
              <b> Destination place: </b>
            </label>
            <p>{this.props.driverWaybill.destinationCountry}, г.{this.props.driverWaybill.destinationCity},
              {this.props.driverWaybill.destinationStreet}, д.{this.props.driverWaybill.destinationHouse}</p>

            <label>
              <b> Destination date: </b>
            </label>
            <p>{reformatDate(this.props.driverWaybill.destinationDate)}</p>

            <div>
              <h3>Checkpoints {this.props.driverWaybill.passedCheckPoints}/{this.props.driverWaybill.allCheckPoints}</h3>
              <table className='table table-hover'>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Pass</th>
                  <th>Description</th>
                  <th>Pass date</th>
                </tr>
                </thead>
                <tbody>
                {checkPoints}
                </tbody>
              </table>
            </div>
            <div className='btn-toolbar text-center'>
              <div className='btn-group' role='group'>
                { this.props.driverWaybill.passedCheckPoints === this.props.driverWaybill.allCheckPoints &&
                  <button type="button"
                          className="btn btn-primary"
                          data-toggle="modal"
                          data-target="#myModal">Product list</button>
                }
                <button type='button'
                        className='btn btn-default'
                        onClick={this.cancel.bind(this)}> Close </button>
              </div>
            </div>
          </fieldset>
        </form>

        {/*Modal*/}
        <Formsy.Form onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)}>
          <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              {/*Modal content*/}
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title">Product list</h3>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  <p>Please, enter info about lost products</p>
                  <table className='table table-hover'>
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Amount, u.</th>
                      <th colSpan="3">Lost information</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products}
                    </tbody>
                  </table>
                </div>
                  <div className="modal-footer">
                    {
                      this.props.driverWaybill.waybillState === WAYBILL_STATE.TRANSPORTATION_STARTED &&
                      <button type="button"
                              className="btn btn-success"
                              data-dismiss="modal"
                              onClick={this.passDestination.bind(this)}
                              disabled={!this.state.canSubmit}> Save </button>
                    }
                    <button type="button"
                            className="btn btn-default"
                            data-dismiss="modal"> Close </button>
                </div>
              </div>
            </div>
          </div>
        </Formsy.Form>
      </div>

    );
  }
}

DriverWaybillsForm.propTypes = {
  driverWaybill: React.PropTypes.object.isRequired,
  changes: React.PropTypes.bool,
  passCheckPoint: React.PropTypes.func.isRequired,
  passDestination: React.PropTypes.func.isRequired,
  cancelOperation: React.PropTypes.func.isRequired,
  updateOperation: React.PropTypes.func.isRequired,
  products: React.PropTypes.array,
};

let mapStateToProps = function (state) {
  return {
    products: state.driverWaybills.productsInWaybill,
    lostTypes: state.lostTypes.lostTypes,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    passCheckPoint: bindActionCreators(passCheckPoint, dispatch),
    passDestination: bindActionCreators(passDestination, dispatch),
    cancelOperation: bindActionCreators(cancelOperation, dispatch),
    updateOperation: bindActionCreators(updateOperation, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverWaybillsForm);
