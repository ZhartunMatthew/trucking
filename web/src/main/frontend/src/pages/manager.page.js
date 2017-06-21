import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTab } from '../actions/navigation.action';
import { loadRegisteredInvoices, fetchInvoice } from '../actions/invoice.action';
import { cancelOperation } from '../actions/operation.action';
import HeaderComponent from './header';
import FooterComponent from './footer';
import InvoiceComponent from '../components/invoice/invoice-component'
import Modal from '../components/modal/modal'

class ManagerPage extends React.Component {

  componentDidMount() {
    this.props.loadRegisteredInvoices();
    this.props.cancelCurrentOperation();
  }

  render() {
    let navItems = [{
      url: '/invoice',
      caption: 'Invoices'
    }];

    let defaultPageInfo = <InvoiceComponent/>;

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
          <Modal/>
        </div>
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
    loadRegisteredInvoices: bindActionCreators(loadRegisteredInvoices, dispatch),
    fetchInvoice: bindActionCreators(fetchInvoice, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerPage);

