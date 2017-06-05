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
        <nav className="navbar navbar-inverse bg-inverse navbar-toggleable-md">
          <a className="navbar-brand" href="#">Trucking</a>
          <div className="collapse navbar-collapse" id="containerNavbar">

            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to='/customer'>Customers</Link>
              </li>
              {/*<li className="nav-item active">*/}
                {/*<Link className="nav-link" to='/invoice'>Invoices</Link>*/}
              {/*</li>*/}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a className="nav-link" href="#">Log out</a></li>
            </ul>
          </div>
        </nav>
        {/*<ul>*/}
          {/*<li>*/}
            {/*<Link to='/customer'> Customers </Link>*/}
          {/*</li>*/}
          {/*<li>*/}
            {/*<Link to='/invoice'> Invoices </Link>*/}
          {/*</li>*/}
        {/*</ul>*/}
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
