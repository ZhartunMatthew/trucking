import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTab } from '../actions/navigation.action';
import { loadInvoices, fetchInvoice } from '../actions/invoice.action';
import { cancelOperation } from '../actions/operation.action';
import HeaderComponent from './header';
import FooterComponent from './footer';

class ManagerPage extends React.Component {

  componentDidMount() {
    this.props.loadInvoices();
    this.props.cancelCurrentOperation();
  }

  render() {
    var navItems = [{
      url: '/invoice',
      caption: 'Invoices'
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
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    selectTab: bindActionCreators(selectTab, dispatch),
    loadInvoices: bindActionCreators(loadInvoices, dispatch),
    fetchInvoice: bindActionCreators(fetchInvoice, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerPage);

