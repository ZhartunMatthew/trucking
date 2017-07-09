import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadCustomers } from '../actions/customer.action';
import { loadInvoices} from '../actions/invoice.action';
import { cancelOperation } from '../actions/operation.action';
import HeaderComponent from './header';
import FooterComponent from './footer';
import CustomerComponent from '../components/customer/customer-component';
import Modal from '../components/modal/modal';
import { NAV_ITEMS } from '../constants/constants';
import { initialize, terminate } from '../actions/messaging.action'

class DispatcherPage extends React.Component {

  componentDidMount() {
    this.props.loadCustomers();
    this.props.loadInvoices();
    this.props.cancelCurrentOperation();
  }

  componentDidUpdate() {
    initialize('/dispatcher-box', this.props.truckingId);
  }

  componentWillUnmount() {
    terminate();
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

let mapStateToProps = function (state) {
  return {
    truckingId: state.currentUser.currentUser.truckingCompanyId
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loadCustomers: bindActionCreators(loadCustomers, dispatch),
    loadInvoices: bindActionCreators(loadInvoices, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (DispatcherPage);
