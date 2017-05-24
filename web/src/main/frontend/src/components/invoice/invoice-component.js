import React from 'react';
import { connect } from 'react-redux';
import InvoiceForm from './invoice-form';
import InvoiceTable from './invoice-table';

class InvoiceComponent extends React.Component {

  render() {
    let content = this.props.currentInvoice ? (
      <div className='row'>
        <div className='col-sm-6'>
          <InvoiceForm changes={this.props.changes} invoice={this.props.currentInvoice}/>
        </div>
        <div className='col-sm-6'>
          <InvoiceTable invoices={this.props.invoices}/>
        </div>
      </div>
    ) : (
      <div className='row'>
        <div className='col align-self-center'>
          <InvoiceTable invoices={this.props.invoices}/>
        </div>
      </div>
    );
    return (
      <div className='container'>
        {content}
      </div>
    );
  }
}

let mapStateToProps = function (state) {
  return {
    invoices: state.invoices.invoices,
    currentInvoice: state.operation.modifiedValue,
    changes: state.operation.changes
  };
};

export default connect(mapStateToProps, () => {})(InvoiceComponent);

