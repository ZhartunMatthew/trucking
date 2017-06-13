import React from 'react';
import { connect } from 'react-redux';
import InvoiceForm from './invoice-form';
import InvoiceTable from './invoice-table';
import ProductTable from '../product/product-table';
import ProductForm from '../product/product-form';
import ProductComponent from "../product/product-component";
import { bindActionCreators } from 'redux';
import { startOperation, cancelOperation } from '../../actions/operation.action';
import { loadFreeDrivers, loadFreeCars } from '../../actions/availiable.action';
import { loadCustomers } from '../../actions/customer.action'
import { Role } from '../../constants/roles'

class InvoiceComponent extends React.Component {

  componentDidMount() {
    if(this.props.userRole === Role.COMPANY_OWNER) {
      this.props.cancelOperation();
    }

    if(this.props.userRole === Role.DISPATCHER) {
      this.props.loadFreeDrivers();
      this.props.loadFreeCars(true);
      this.props.loadAllCustomers();
      this.props.cancelOperation();

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
    }
  }

  render() {
    let role = this.props.userRole;
    let content = null;
    if(role === Role.MANAGER || role === Role.COMPANY_OWNER) {
      content = this.props.currentInvoice ? (
        <div className='row'>
          <div className='col-sm-4'>
            <InvoiceForm changes={this.props.changes}
                         invoice={this.props.currentInvoice}/>
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
    }

    if(role === 'DISPATCHER') {
      this.copyProductsFromStateToInvoice();
      content = this.props.currentInvoice ? (
        <div className='row'>
          <div className='col-sm-4'>
            <InvoiceForm changes={this.props.changes} invoice={this.props.currentInvoice}/>
          </div>
          <div className='col-sm-6'>
            <ProductComponent/>
          </div>
        </div>
      ) : (
        <div className='row'>
          <div className='col align-self-center'>
            <InvoiceTable invoices={this.props.invoices}/>
          </div>
        </div>
      );
    }
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
    loadAllCustomers: bindActionCreators(loadCustomers, dispatch)
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
