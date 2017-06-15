import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { startOperation } from '../../actions/operation.action';

class InvoiceTable extends React.Component {

  onShowUpdateInvoiceForm(invoice) {
    this.props.startOperation(invoice);
  }

  render() {
    let rows = this.props.invoices.map((invoice, index) => {
      return (
        <tr key={invoice.id}>
          <th scope='row'> {index + 1} </th>
          <td> {invoice.number}</td>
          <td> {invoice.registerDate}</td>
          <td> {invoice.customerCompany}</td>
          <td>
            <div className='btn-toolbar text-center'>
              <button className='btn btn-primary' onClick={this.onShowUpdateInvoiceForm.bind(this, invoice)}> Update </button>
            </div>
          </td>
        </tr>
      )
    });
    return (
      <div>
        <h1>List of invoices</h1>
        <table className='table table-striped table-hover'>
          <thead>
          <tr>
            <th>#</th>
            <th>invoice number</th>
            <th>register date</th>
            <th>customer company</th>
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

InvoiceTable.propTypes = {
  invoices: React.PropTypes.array.isRequired,
  startOperation: React.PropTypes.func.isRequired,
};


let mapStateToProps = function () {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceTable);

