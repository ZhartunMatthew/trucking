import React from 'react';
import Input from '../common/text-input';
import CheckBox from '../common/checkbox';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { passCheckPoint, passDestination} from '../../actions/driverWaybills.action';
import { cancelOperation, updateOperation } from '../../actions/operation.action';

class DriverWaybillsForm extends React.Component {

  handleProductLostChange(event, id) {
    this.props.updateOperation(id, event.target.value);
  }

  passCheckpoint(checkPoint) {
    this.props.passCheckPoint(checkPoint);
  }

  passDestination(waybill) {
    this.props.passDestination(waybill);
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
      return (
        <tr key={product.id}>
          <th scope='row'> {index + 1} </th>
          <td>{product.name}</td>
          <td>{product.amount}</td>
          <td>
            <Input label='Lost products' id={product.id} type='text' value={product.lost} onChange={this.handleProductLostChange.bind(this, product.id)}/>
          </td>
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
                <tr>
                  <th scope='row'> destination </th>
                  <td>
                    {this.props.driverWaybill.destinationDate ? (
                        <CheckBox className="checkPointBox" checked disabled/>
                      ) : (
                        <CheckBox className="checkPointBox" onChange={this.passDestination.bind(this, this.props.driverWaybill)}/>
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

        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open product list</button>

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
                <p>Please, enter amount of losed product</p>
                <table className='table table-hover'>
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Lost</th>
                  </tr>
                  </thead>
                  <tbody>
                  {products}
                  </tbody>
                </table>
              </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-success" data-dismiss="modal">Save</button>
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
};

let mapStateToProps = function (state) {
  return {
    products: state.driverWaybills.productsInWaybill,
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
