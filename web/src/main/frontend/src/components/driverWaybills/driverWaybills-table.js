import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startOperation } from '../../actions/operation.action';
import { loadProducts } from '../../actions/driverWaybills.action';
import { loadLostTypes } from '../../actions/product.action'
import { WAYBILL_STATE } from '../../constants/constants';
import { getDateString } from '../../constants/date.functions'

class DriverWaybillsTable extends React.Component {

  onShowUpdateWaybillForm(driverWaybill) {
    this.props.startOperation(driverWaybill);
    this.props.loadProducts(driverWaybill.invoiceId);
    this.props.loadLostTypes();
  }

  render() {
    let rows = this.props.driverWaybills.map((driverWaybill, index) => {
      return (
        <tr key={driverWaybill.id}>
          <th scope='row'> {index + 1} </th>
          <td>{driverWaybill.waybillNumber}</td>
          <td>{getDateString(driverWaybill.departureDate)}</td>
          <td>{driverWaybill.price}</td>
          <td>{driverWaybill.totalDistance}</td>
          <td>{driverWaybill.passedCheckPoints}/{driverWaybill.allCheckPoints}</td>
          <td>
            <div>
              { driverWaybill.waybillState === WAYBILL_STATE.TRANSPORTATION_COMPLETED ? (
                <button className='btn btn-info no-right-margin' onClick={this.onShowUpdateWaybillForm.bind(this, driverWaybill)}>
                  Show
                </button>
                ) : (
                <button className='btn btn-warning no-right-margin' onClick={this.onShowUpdateWaybillForm.bind(this, driverWaybill)}>
                   Check
                </button>
                )
              }
            </div>
          </td>
        </tr>
      )
    });

    return (
      <div className="col">
        <h3>List of waybills</h3>
        <table className='table table-striped table-hover'>
          <thead>
          <tr>
            <th>#</th>
            <th>Number</th>
            <th>Departure date</th>
            <th>Price, $</th>
            <th>Total distance, km</th>
            <th>Checkpoints: passed/all </th>
            <th>Action </th>
          </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

DriverWaybillsTable.propTypes = {
  driverWaybills: React.PropTypes.array.isRequired,
  startOperation: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch),
    loadProducts: bindActionCreators(loadProducts, dispatch),
    loadLostTypes: bindActionCreators(loadLostTypes, dispatch)
  }
}

export default connect(() => {}, mapDispatchToProps)(DriverWaybillsTable);
