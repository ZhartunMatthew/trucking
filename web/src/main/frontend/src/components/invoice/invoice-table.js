import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startOperation } from '../../actions/operation.action';
import { getDateString } from '../../constants/date.functions'

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
          <td> {getDateString(invoice.registerDate)}</td>
          <td> {invoice.customerCompany}</td>
          <td> {invoice.destinationCustomerCompany}</td>
          <td style={{paddingRight: '0px'}}>
            <button className='btn btn-primary'
                    onClick={this.onShowUpdateInvoiceForm.bind(this, invoice)}>Open</button>
          </td>
        </tr>
      )
    });

    return (
      <div className="col">
        <h3>List of invoices</h3>
        <table className='table table-hover'>
          <thead>
          <tr>
            <th>#</th>
            <th>Invoice number</th>
            <th>Register date</th>
            <th>Customer company</th>
            <th>Destination company</th>
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

InvoiceTable.propTypes = {
  invoices: React.PropTypes.array.isRequired,
  startOperation: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch)
  }
}

export default connect(() => {}, mapDispatchToProps)(InvoiceTable);

