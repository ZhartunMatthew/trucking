import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { startOperation } from '../../actions/operation.action';

class DriverWaybillsTable extends React.Component {

  onShowUpdateWaybillForm(driverWaybill) {
    this.props.startOperation(driverWaybill);
  }

  onShowCreateWaybillForm() {
    this.props.startOperation({waybillNumber: '', departureCity: ''});
  }

  render() {
    let rows = this.props.driverWaybills.map((driverWaybill, index) => {
      return (
        <tr key={driverWaybill.id}>
          <th scope='row'> {index + 1} </th>
          <td> {driverWaybill.waybillNumber}</td>
          <td> {driverWaybill.departureCity}</td>
          <td>
            <div className='btn-toolbar text-center'>
              <button className='btn btn-primary' onClick={this.onShowUpdateWaybillForm.bind(this, driverWaybill)}>Update</button>
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
            <th>departureCity</th>
            <th>actions</th>
          </tr>
          </thead>
          <tbody>
          {rows}
          <tr>
            <td colSpan={3}>
              <button className='btn btn-default' onClick={this.onShowCreateWaybillForm.bind(this)}>Create New Trucking company
              </button>
            </td>
          </tr>
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
