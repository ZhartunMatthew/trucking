import React from 'react';
import { connect } from 'react-redux';
import InvoiceForm from './invoice-form';
import InvoiceTable from './invoice-table';
import ProductComponent from "../product/product-component";
import { bindActionCreators } from 'redux';
import { startOperation, cancelOperation } from '../../actions/operation.action';

class InvoiceComponent extends React.Component {
  constructor() {
    super();
    this.onSubmitInvoiceForm = this.onSubmitInvoiceForm.bind(this);
  }

  componentDidMount() {
    if(this.props.userRole === 'DISPATCHER') {
      this.props.cancelOperation();
      this.props.startOperation({
        number: '',
        registerDate: '',
        checkDate: '',
        invoiceState: {
          id: 1,
          name: 'Issued'
        },
        customerCompanyId: this.props.customerCompany.id,
        customerCompany: this.props.customerCompany.name,
        truckingCompanyId: this.props.customerCompany.truckingCompanyId,
        truckingCompany: '',
        driverId: '',
        managerId: '',
        dispatcherId: '',
        carId: '',
        products: []
      });
    }
  }

  render() {
    let role = this.props.userRole;

    let content = this.props.currentInvoice ? (
      <div className='row'>
        <div className='col-sm-6'>
          <InvoiceForm changes={this.props.changes} invoice={this.props.currentInvoice} onSubmit={this.onSubmitInvoiceForm}/>
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

    if(role === "DISPATCHER" && this.props.currentInvoice === null) {
      content =
        <div className='row'>
          <div className='col-sm-6'>
            <InvoiceForm changes={this.props.changes} invoice={null}/>
          </div>
          <div className='col-sm-6'>
            <ProductComponent/>
          </div>
        </div>
    }

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
    router: React.PropTypes.func,
    userRole: React.PropTypes.String
};

  function mapDispatchToProps(dispatch) {
    return {
      cancelOperation: bindActionCreators(cancelOperation, dispatch),
      startOperation: bindActionCreators(startOperation, dispatch)
    }
  }

let mapStateToProps = function (state) {
  return {
    invoices: state.invoices.invoices,
    currentInvoice: state.operation.modifiedValue,
    changes: state.operation.changes,
    userRole: state.userRole.userRole,
    customerCompany: state.operation.modifiedValue
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceComponent);

