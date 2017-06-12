import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadCustomers, fetchCustomer } from '../actions/customer.action';
import { loadInvoices, fetchInvoice} from '../actions/invoice.action';
import { cancelOperation } from '../actions/operation.action';
import { Link } from 'react-router';
import HeaderComponent from './header';
import FooterComponent from './footer';

class DispatcherPage extends React.Component {

  componentDidMount() {
    this.props.loadCustomers();
    this.props.loadInvoices();
    this.props.cancelCurrentOperation();
  }

  render() {
    var navItems = [{
      url: '/customer',
      caption: 'Customers'
    }];
    return (
      <div>
        <div className="wrapper">
          <HeaderComponent navItems={navItems}/>
          {this.props.children}
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
