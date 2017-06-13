import React from 'react';
import Input from '../common/text-input';
import CheckBox from '../common/checkbox';
import TextareaElement from '../common/textarea';
import Select from '../common/select';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { passCheckPoint, passDestination} from '../../actions/driverWaybills.action';
import { cancelOperation, updateOperation } from '../../actions/operation.action';

class DriverWaybillsForm extends React.Component {

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

  render() {
    let checkPoints = this.props.driverWaybill.checkPoints.map((checkPoint, index) => {
      return (
        <tr key={checkPoint.id}>
          <th scope='row'> {index + 1} </th>
          <td>
            {checkPoint.pathDate ? (
                <CheckBox className="checkPointBox" checked disabled/>
              ) : (
                <CheckBox className="checkPointBox" onChange={this.passCheckpoint.bind(this, checkPoint)}/>
              )
            }
          </td>
          <td> {checkPoint.description}</td>
          <td> {checkPoint.pathDate}</td>
        </tr>
      )
    });
    let products = this.props.products.map((product, index) => {
      const defaultType = product.lostReason ? product.lostReason : [];
      return (
        <tr key={product.id}>
          <th scope='row'> {index + 1} </th>
          <td>{product.name}</td>
          <td>{product.amount}</td>
          <td width="15%">
            <Input id={"amountLost" + product.id} label="Amount lost" type="text" value={product.lostAmount}
              onChange={this.handleProductLostChange.bind(this, product.id, product)}/>
          </td>
          <td>
            <Select id={"typeLost" + product.id} label="Reason lost" value={defaultType}
                    options={this.props.lostTypes.map((type)=>{return ( <option> {type} </option> )})}
                    onChange={this.handleProductTypeChange.bind(this, product.id, product)}/>
          </td>
          <td>
            <TextareaElement id={"descLost" + product.id} label="Description lost"
                             value={product.lostDescription} rows={4}
              onChange={this.handleProductDescChange.bind(this, product.id, product)}/>
          </td>
        </tr>
      )
    });
    return (
      <div>
        <form className='form-horizontal'>
          <fieldset>
            <legend><span> Waybill №<b>{this.props.driverWaybill.waybillNumber}</b></span></legend>
            <label><b>Departure place:</b></label>
            <p>{this.props.driverWaybill.departureCountry}, г.{this.props.driverWaybill.departureCity},
                    {this.props.driverWaybill.departureStreet}, д.{this.props.driverWaybill.departureHouse}</p>
            <label><b>Departure date:</b></label>
            <p>{this.props.driverWaybill.departureDate}</p>
            <label><b>Destination place:</b></label>
            <p>{this.props.driverWaybill.destinationCountry}, г.{this.props.driverWaybill.destinationCity},
              {this.props.driverWaybill.destinationStreet}, д.{this.props.driverWaybill.destinationHouse}</p>
            <label><b>Destination date:</b></label>
            <p>{this.props.driverWaybill.destinationDate}</p>
            <div>
              <h3>Checkpoints {this.props.driverWaybill.passedCheckPoints}/{this.props.driverWaybill.allCheckPoints}</h3>
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
                </tbody>
              </table>
            </div>
            <div className='btn-toolbar text-center'>
              <div className='btn-group' role='group'>
                { this.props.driverWaybill.passedCheckPoints === this.props.driverWaybill.allCheckPoints &&
                  <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Pass</button>
                }
                <button type='button' className='btn btn-default' onClick={this.cancel.bind(this)}>Close</button>
              </div>
            </div>
          </fieldset>
        </form>

        {/*Modal*/}
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
                    <th>Amount</th>
                    <th colSpan="3">Lost information</th>
                  </tr>
                  </thead>
                  <tbody>
                  {products}
                  </tbody>
                </table>
              </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.passDestination.bind(this)}>Save</button>
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
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
