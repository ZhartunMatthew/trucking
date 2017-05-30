import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTab } from '../actions/navigation.action';
import { loadUsers, fetchUser } from '../actions/user.action';
import { loadCustomers, fetchCustomer } from '../actions/customer.action';
import { loadCars, fetchCar } from '../actions/car.action';
import { loadInvoices, fetchInvoice } from '../actions/invoice.action';
import { cancelOperation } from '../actions/operation.action';
import { Link } from 'react-router';
import {
  NAVIGATION_TAB_GENRES
} from '../constants/constants';

class CompanyOwnerPage extends React.Component{
  componentDidMount() {
    this.props.selectTab(NAVIGATION_TAB_GENRES);
    this.props.loadUsers();
    this.props.cancelCurrentOperation();
    this.props.loadCustomers();
    this.props.loadCars();
    this.props.loadInvoices();
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to='/user'>Users</Link></li>
          <li><Link to='/customer'>Customers</Link></li>
          <li><Link to='/car'>Cars</Link></li>
          <li><Link to=''>Waybills</Link></li>
          <li><Link to='/invoice'>Invoices</Link></li>
          <li><Link to=''>Products</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    selectTab: bindActionCreators(selectTab, dispatch),
    loadUsers: bindActionCreators(loadUsers, dispatch),
    fetchUser: bindActionCreators(fetchUser, dispatch),
    loadCustomers: bindActionCreators(loadCustomers, dispatch),
    fetchCustomer: bindActionCreators(fetchCustomer, dispatch),
    loadCars: bindActionCreators(loadCars, dispatch),
    fetchCar: bindActionCreators(fetchCar, dispatch),
    loadInvoices: bindActionCreators(loadInvoices, dispatch),
    fetchInvoice: bindActionCreators(fetchInvoice, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyOwnerPage);


