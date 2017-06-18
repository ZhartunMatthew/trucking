import React from 'react';
import { connect } from 'react-redux';
import InvoiceForm from './invoice-form';
import InvoiceTable from './invoice-table';
import ProductTable from '../product/product-table';
import ProductComponent from "../product/product-component";
import { bindActionCreators } from 'redux';
import { startOperation, cancelOperation } from '../../actions/operation.action';
import { loadFreeDrivers, loadFreeCars } from '../../actions/availiable.action';
import { loadCustomers } from '../../actions/customer.action';
import { Role } from '../../constants/roles';
import CustomerTable from '../customer/customer-table';
import { setActionFail } from '../../actions/modal.action';
import { loadRegisteredInvoices } from '../../actions/invoice.action';

class InvoiceComponent extends React.Component {

  componentWillUnmount() {
    if(this.props.userRole === Role.COMPANY_OWNER) {
      this.props.cancelOperation();
    }
  }

  componentDidMount() {
    if(this.props.userRole === Role.DISPATCHER) {
      this.props.loadFreeDrivers();
      this.props.loadFreeCars(true);
      this.props.loadAllCustomers();
      this.props.cancelOperation();

      if (this.props.currentInvoice !== null) {
        this.props.startOperation({
          number: '',
          registerDate: '',
          checkDate: '',
          invoiceState: 'ISSUED',
          customerCompanyId: this.props.customerCompany.id,
          customerCompany: this.props.customerCompany.name,
          customerCompanyCity: this.props.customerCompany.city,
          destinationCustomerCompanyId: getFirstId(this.props.destinationCustomers, 1),
          truckingCompanyId: this.props.customerCompany.truckingCompanyId,
          truckingCompany: '',
          driverId: getFirstId(this.props.users, 5),
          managerId: '',
          dispatcherId: '',
          carId: getFirstId(this.props.cars, 1),
          currentProductName: '',
          currentProductAmount: '',
          products: []
        });
      } else {
        setActionFail();
      }
    }

    if(this.props.userRole === Role.MANAGER) {
      this.props.loadRegisteredInvoices();
      setTimeout(function (self) {
        self.props.loadRegisteredInvoices();
      }, 200, this);
    }
  }

  render() {
    let role = this.props.userRole;
    let productContent = null;
    let emptyOperationContent = null;

    if(this.props.currentInvoice !== null) {
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
        this.context.router.push("/customer");
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
      <div className='row'>
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
        productState: 'REGISTERED'
      });
    })
  }

}

InvoiceComponent.contextTypes = {
  router: React.PropTypes.func,
  userRole: React.PropTypes.String,
  products: React.PropTypes.Array
};

function mapDispatchToProps(dispatch) {
  return {
    cancelOperation: bindActionCreators(cancelOperation, dispatch),
    startOperation: bindActionCreators(startOperation, dispatch),
    loadFreeDrivers: bindActionCreators(loadFreeDrivers, dispatch),
    loadFreeCars: bindActionCreators(loadFreeCars, dispatch),
    loadAllCustomers: bindActionCreators(loadCustomers, dispatch),
    loadRegisteredInvoices: bindActionCreators(loadRegisteredInvoices, dispatch)
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

function getFirstId(list, val) {
  if(list !== null && list !== undefined) {
    if(list[0] !== null && list[0] !== undefined) {
      return list[0].id;
    } else {
      return val;
    }
  }
}
