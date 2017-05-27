import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadInvoices, fetchInvoice } from '../actions/invoice.action';
import { cancelOperation } from '../actions/operation.action';
import { Link } from 'react-router';

class ManagerPage extends React.Component {

  componentDidMount() {
    this.props.loadInvoices();
    this.props.cancelCurrentOperation();
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to='/invoice'>Invoices</Link></li>
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
    loadInvoices: bindActionCreators(loadInvoices, dispatch),
    fetchInvoice: bindActionCreators(fetchInvoice, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerPage);

