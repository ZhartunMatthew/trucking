import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadCustomers, fetchCustomer } from '../actions/customer.action';
import { loadInvoices, fetchInvoice} from '../actions/invoice.action';
import { cancelOperation } from '../actions/operation.action';
import HeaderComponent from './header';
import FooterComponent from './footer';
import CustomerComponent from './customer/customer-component'

class DispatcherPage extends React.Component {

  componentDidMount() {
    this.props.loadCustomers();
    this.props.loadInvoices();
    this.props.cancelCurrentOperation();
  }

  render() {
    let navItems = [{
      url: '/customer',
      caption: 'Customers'
    }];

    let defaultPageInfo = <CustomerComponent/>;

    return (
      <div>
        <div className="wrapper">
          <HeaderComponent navItems={navItems}/>
          {
            !this.props.children && defaultPageInfo
          }
          {
            this.props.children
          }
        </div>
        <FooterComponent/>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    loadCustomers: bindActionCreators(loadCustomers, dispatch),
    fetchCustomer: bindActionCreators(fetchCustomer, dispatch),
    loadInvoices: bindActionCreators(loadInvoices, dispatch),
    fetchInvoices: bindActionCreators(fetchInvoice, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (DispatcherPage);
