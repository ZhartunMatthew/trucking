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
import { initialize, terminate } from '../actions/messaging.action'

class ManagerPage extends React.Component {

  componentDidMount() {
    this.props.loadRegisteredInvoices();
    this.props.cancelCurrentOperation();
  }

  componentDidUpdate() {
    initialize('/manager-box', this.props.truckingId);
  }

  componentWillUnmount() {
    terminate();
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

let mapStateToProps = function (state) {
  return {
    truckingId: state.currentUser.currentUser.truckingCompanyId
  };
};


function mapDispatchToProps(dispatch) {
  return {
    loadRegisteredInvoices: bindActionCreators(loadRegisteredInvoices, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerPage);

