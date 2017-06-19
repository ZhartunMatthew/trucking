import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {startOperation } from '../../actions/operation.action';
import { sentenceCase } from 'change-case';

class OwnerWaybillsTable extends React.Component {

  onShowWaybillForm(car) {
    this.props.startOperation(car);
  }

  render() {
    let rows = this.props.waybills.map((waybill, index) => {
      return (
          <tr key={waybill.id}>
            <th scope='row'> {index + 1} </th>
            <td> {waybill.waybillNumber}</td>
            <td> {sentenceCase(waybill.waybillState)}</td>
            <td> {waybill.price}</td>
            <td> {waybill.totalDistance}</td>
            <td> {waybill.allCheckPoints}</td>
            <td>
              <div className='btn-toolbar text-center'>
                <button className='btn btn-primary' onClick={this.onShowWaybillForm.bind(this, waybill)}>Open</button>
              </div>
            </td>
          </tr>
        )

    });
    return (
      <div>
        <h1>List of waybills</h1>
        <table className='table table-striped table-hover'>
          <thead>
          <tr>
            <th>#</th>
            <th>number</th>
            <th>state</th>
            <th>price, $</th>
            <th>total distance, km</th>
            <th>checkpoints amount</th>
            <th>actions</th>
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

OwnerWaybillsTable.propTypes = {
  cars: React.PropTypes.array.isRequired,
};


let mapStateToProps = function () {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerWaybillsTable);
