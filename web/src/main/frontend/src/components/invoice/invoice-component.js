import React from 'react';
import { connect } from 'react-redux';
import InvoiceForm from './invoice-form';
import InvoiceTable from './invoice-table';
import ProductTable from '../product/product-table';
import ProductComponent from '../product/product-component';
import { bindActionCreators } from 'redux';
import { startOperation, cancelOperation } from '../../actions/operation.action';
import { loadFreeDrivers, loadFreeCars } from '../../actions/availiable.action';
import { loadCustomers } from '../../actions/customer.action';
import { Role } from '../../constants/roles';
import CustomerTable from '../customer/customer-table';
import { setActionFail } from '../../actions/modal.action';
import { loadRegisteredInvoices } from '../../actions/invoice.action';
import { POOLING_TIMEOUT, PRODUCT_STATE, INVOICE_STATE } from '../../constants/constants';
import { loadInvoices } from '../../actions/invoice.action';

class InvoiceComponent extends React.Component {

  componentDidMount() {
    if (this.props.userRole === Role.DISPATCHER) {
      this.props.loadFreeDrivers();
      this.props.loadFreeCars(true);
      this.props.loadAllCustomers();
      this.props.cancelOperation();

      if (this.props.currentInvoice !== null) {
        this.props.startOperation({
          number: '',
          registerDate: '',
          checkDate: '',
          invoiceState: INVOICE_STATE.ISSUED,
          customerCompanyId: this.props.customerCompany.id,
          customerCompany: this.props.customerCompany.name,
          customerCompanyCity: this.props.customerCompany.city,
          destinationCustomerCompanyId: null,
          truckingCompanyId: this.props.customerCompany.truckingCompanyId,
          truckingCompany: '',
          driverId: null,
          managerId: '',
          dispatcherId: '',
          carId: null,
          currentProductName: '',
          currentProductAmount: '',
          products: []
        });
      } else {
        setActionFail();
      }
    }

    if (this.props.userRole === Role.MANAGER) {
      this.props.loadRegisteredInvoices();
      this.invoiceLoader = setInterval(function (self) {
        console.log('Invoice list were updated');
        self.props.loadRegisteredInvoices();
      }, POOLING_TIMEOUT, this);
      console.log('Pulling of new invoices started');
    }

    if (this.props.userRole === Role.COMPANY_OWNER) {
      this.invoiceLoader = setInterval(function (self) {
        console.log('Invoice list were updated');
        this.invoiceLoader = self.props.loadInvoices();
      }, POOLING_TIMEOUT, this);
      console.log('Pulling of new invoices started');
    }
  }

  componentWillUnmount() {
    if (this.props.userRole === Role.MANAGER || this.props.userRole === Role.COMPANY_OWNER) {
      clearInterval(this.invoiceLoader);
      console.log('Pooling of new invoices stopped');
    }
    if (this.props.userRole === Role.COMPANY_OWNER) {
      this.props.cancelOperation();
    }
  }

  render() {
    let role = this.props.userRole;
    let productContent = null;
    let emptyOperationContent = null;

    if (this.props.currentInvoice !== null) {
      if (role === Role.MANAGER || role === Role.COMPANY_OWNER) {
        productContent = <ProductTable products={this.props.currentInvoice.products}/>;
      }
      if (role === Role.DISPATCHER) {
        this.copyProductsFromStateToInvoice();
        productContent = <ProductComponent/>;
      }
    } else {
      if (role === Role.MANAGER || role === Role.COMPANY_OWNER) {
        emptyOperationContent = <InvoiceTable invoices={this.props.invoices}/>;
      }
      if (role === Role.DISPATCHER) {
        this.context.router.push('/customer');
        emptyOperationContent = <CustomerTable customers={this.props.destinationCustomers}/>;
      }
    }

    let content = this.props.currentInvoice ? (
      <div className='row'>
        <div className='col-sm-6'>
          <InvoiceForm changes={this.props.changes} invoice={this.props.currentInvoice}/>
        </div>
        <div className='col-sm-6'>
          {productContent}
        </div>
      </div>
    ) : (
      <div className='container col-sm-9'>
        <div className='col align-self-center'>
          {emptyOperationContent}
        </div>
      </div>
    );

    return (
      <div className='container'>
        {content}
      </div>
    );
  }

  copyProductsFromStateToInvoice() {
    this.props.currentInvoice.products = [];
    this.props.products.map((product) => {
      this.props.currentInvoice.products.push({
        amount: product.amount,
        name: product.name,
        price: product.price,
        productState: PRODUCT_STATE.REGISTERED
      });
    })
  }

}

InvoiceComponent.contextTypes = {
  router: React.PropTypes.func,
};

InvoiceComponent.propTypes = {
  userRole: React.PropTypes.string,
  products: React.PropTypes.array
};

function mapDispatchToProps(dispatch) {
  return {
    cancelOperation: bindActionCreators(cancelOperation, dispatch),
    startOperation: bindActionCreators(startOperation, dispatch),
    loadFreeDrivers: bindActionCreators(loadFreeDrivers, dispatch),
    loadFreeCars: bindActionCreators(loadFreeCars, dispatch),
    loadAllCustomers: bindActionCreators(loadCustomers, dispatch),
    loadRegisteredInvoices: bindActionCreators(loadRegisteredInvoices, dispatch),
    loadInvoices: bindActionCreators(loadInvoices, dispatch)
  }
}

let mapStateToProps = function (state) {
  return {
    invoices: state.invoices.invoices,
    currentInvoice: state.operation.modifiedValue,
    changes: state.operation.changes,
    userRole: state.userRole.userRole,
    customerCompany: state.operation.modifiedValue,
    products: state.products.products,
    users: state.users.users,
    cars: state.cars.cars,
    destinationCustomers: state.customers.customers
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceComponent);
