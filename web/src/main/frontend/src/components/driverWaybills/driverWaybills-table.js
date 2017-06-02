import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { startOperation } from '../../actions/operation.action';

class DriverWaybillsTable extends React.Component {

  onShowUpdateWaybillForm(driverWaybill) {
    this.props.startOperation(driverWaybill);
  }

  render() {
    let rows = this.props.driverWaybills.map((driverWaybill, index) => {
      return (
        <tr key={driverWaybill.id}>
          <th scope='row'> {index + 1} </th>
          <td>{driverWaybill.waybillNumber}</td>
          <td>{driverWaybill.departureDate}</td>
          <td>{driverWaybill.passedCheckPoints}/{driverWaybill.allCheckPoints}</td>
          <td>
            <div className='btn-toolbar text-center'>
              { driverWaybill.waybillState === 'TRANSPORTATION_COMPLETED' ? (
                <button className='btn btn-info' onClick={this.onShowUpdateWaybillForm.bind(this, driverWaybill)}>
                  Show
                </button>
                ) : (
                <button className='btn btn-warning' onClick={this.onShowUpdateWaybillForm.bind(this, driverWaybill)}>
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
      <div>
        <h1>List of waybills</h1>
        <table className='table table-hover'>
          <thead>
          <tr>
            <th>#</th>
            <th>number</th>
            <th>departure date</th>
            <th>checkpoints: passed/all </th>
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
  startOperation: React.PropTypes.func.isRequired
};

let mapStateToProps = function () {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverWaybillsTable);
