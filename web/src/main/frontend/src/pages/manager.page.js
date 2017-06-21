import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadRegisteredInvoices } from '../actions/invoice.action';
import { cancelOperation } from '../actions/operation.action';
import HeaderComponent from './header';
import FooterComponent from './footer';
import InvoiceComponent from '../components/invoice/invoice-component';
import Modal from '../components/modal/modal';
import { NAV_ITEMS } from '../constants/constants';

class ManagerPage extends React.Component {

  componentDidMount() {
    this.props.loadRegisteredInvoices();
    this.props.cancelCurrentOperation();
  }

  render() {
    let navItems = [
      NAV_ITEMS.INVOICES
    ];
    let defaultPageInfo = <InvoiceComponent/>;
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
    loadRegisteredInvoices: bindActionCreators(loadRegisteredInvoices, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(() => {}, mapDispatchToProps)(ManagerPage);

