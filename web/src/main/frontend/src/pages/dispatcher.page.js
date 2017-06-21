import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadCustomers, fetchCustomer } from '../actions/customer.action';
import { loadInvoices, fetchInvoice} from '../actions/invoice.action';
import { cancelOperation } from '../actions/operation.action';
import HeaderComponent from './header';
import FooterComponent from './footer';
import CustomerComponent from '../components/customer/customer-component';
import Modal from '../components/modal/modal';
import { NAV_ITEMS } from '../constants/constants';

class DispatcherPage extends React.Component {

  componentDidMount() {
    this.props.loadCustomers();
    this.props.loadInvoices();
    this.props.cancelCurrentOperation();
  }

  render() {
    let navItems = [
      NAV_ITEMS.CUSTOMERS
    ];
    let defaultPageInfo = <CustomerComponent/>;
    return (
      <div>
        <div className='wrapper'>
          <HeaderComponent navItems={navItems}/>
          {
            !this.props.children && defaultPageInfo
          }
          {
            this.props.children
          }
          <Modal/>
        </div>
        <FooterComponent/>
      </div>
    );
  }
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

export default connect(() => {}, mapDispatchToProps) (DispatcherPage);
