import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startOperation } from '../../actions/operation.action';
import { sentenceCase } from 'change-case';

class OwnerWaybillsTable extends React.Component {

  onShowWaybillForm(waybill) {
    this.props.startOperation(waybill);
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
          <td style={{paddingRight: '0px'}}>
            <button className='btn btn-primary'
                    onClick={this.onShowWaybillForm.bind(this, waybill)}>Open</button>
          </td>
        </tr>
      )
    });
    return (
      <div>
        <h3>List of waybills</h3>
        <table className='table table-hover'>
          <thead>
          <tr>
            <th>#</th>
            <th>Number</th>
            <th>State</th>
            <th>Price, $</th>
            <th>Total distance, km</th>
            <th>Checkpoints amount</th>
            <th>Action</th>
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
  waybills: React.PropTypes.array.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch)
  }
}

export default connect(() => {}, mapDispatchToProps)(OwnerWaybillsTable);
