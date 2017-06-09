import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTab } from '../actions/navigation.action';
import { loadUsers } from '../actions/user.action';
import { loadCustomers } from '../actions/customer.action';
import { loadCars } from '../actions/car.action';
import { loadInvoices } from '../actions/invoice.action';
import { cancelOperation } from '../actions/operation.action';
import HeaderComponent from './header';
import FooterComponent from './footer';

class CompanyOwnerPage extends React.Component {

  componentDidMount() {
    this.props.cancelCurrentOperation();
    this.props.loadUsers();
    this.props.loadCustomers();
    this.props.loadCars();
    this.props.loadInvoices();
  }

  render() {
    var navItems = [{
      url: '/user',
      caption: 'Users'
    },
      {
        url: '/customer',
        caption: 'Customers'
      },
      {
        url: '/car',
        caption: 'Cars'
      },
      {
        url: '/invoice',
        caption: 'Invoices'
      },
      {
        url: '/waybill',
        caption: 'Waybills'
      },
      {
        url: '/report',
        caption: 'Report'
      }];
    return (
      <div>
        <HeaderComponent navItems={navItems}/>
        {this.props.children}
        <FooterComponent/>
      </div>
    );
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    selectTab: bindActionCreators(selectTab, dispatch),
    loadUsers: bindActionCreators(loadUsers, dispatch),
    loadCustomers: bindActionCreators(loadCustomers, dispatch),
    loadCars: bindActionCreators(loadCars, dispatch),
    loadInvoices: bindActionCreators(loadInvoices, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyOwnerPage);


