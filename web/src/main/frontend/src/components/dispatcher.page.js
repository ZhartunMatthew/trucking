import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadCustomers, fetchCustomer } from '../actions/customer.action';
import { loadInvoices, fetchInvoice} from '../actions/invoice.action';
import { cancelOperation } from '../actions/operation.action';
import { Link } from 'react-router';

class DispatcherPage extends React.Component {

  componentDidMount() {
    this.props.loadCustomers();
    this.props.loadInvoices();
    this.props.cancelCurrentOperation();
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to='/customer'> Customers </Link>
          </li>
          {/*<li>*/}
            {/*<Link to='/invoice'> Invoices </Link>*/}
          {/*</li>*/}
        </ul>
        {this.props.children}
      </div>
    )
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