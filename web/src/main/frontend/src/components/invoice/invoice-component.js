import React from 'react';
import { connect } from 'react-redux';
import InvoiceForm from './invoice-form';
import InvoiceTable from './invoice-table';
import ProductTable from '../product/product-table';

class InvoiceComponent extends React.Component {
  constructor() {
    super();
    this.onSubmitInvoiceForm = this.onSubmitInvoiceForm.bind(this);
  }

  render() {
    let content = this.props.currentInvoice ? (
      <div className='row'>
        <div className='col-sm-6'>
          <InvoiceForm changes={this.props.changes} invoice={this.props.currentInvoice}
          onSubmit={this.onSubmitInvoiceForm}/>
        </div>
        <div className='col-sm-6'>
          <ProductTable products={this.props.currentInvoice.products}/>
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

  onSubmitInvoiceForm() {
    this.context.router.push('/waybill');
  }
}

InvoiceComponent.contextTypes = {
    router: React.PropTypes.func
};

let mapStateToProps = function (state) {
  return {
    invoices: state.invoices.invoices,
    currentInvoice: state.operation.modifiedValue,
    changes: state.operation.changes
  };
};

export default connect(mapStateToProps, () => {})(InvoiceComponent);

