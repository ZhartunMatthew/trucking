import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTab } from '../actions/navigation.action';
import { loadUsers, fetchUser } from '../actions/user.action';
import { loadCustomers, fetchCustomer } from '../actions/customer.action';
import { loadCars, fetchCar } from '../actions/car.action';
import { cancelOperation } from '../actions/operation.action';
import { Link } from 'react-router';
import {
  NAVIGATION_TAB_GENRES
} from '../constants/constants';

class AdminPage extends React.Component {

  componentDidMount() {
    this.props.selectTab(NAVIGATION_TAB_GENRES);
    this.props.loadUsers();
    this.props.cancelCurrentOperation();
    this.props.loadCustomers();
    this.props.loadCars();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse bg-inverse navbar-toggleable-md">
          <a className="navbar-brand" href="#">Trucking</a>
          <div className="collapse navbar-collapse" id="containerNavbar">

            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to='/user'>Users</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to='/customer'>Customers</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to='/car'>Cars</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a className="nav-link" href="#">Log out</a></li>
            </ul>
          </div>
        </nav>

        {/*<ul>*/}
          {/*<li><Link to='/user'>Users</Link></li>*/}
          {/*<li><Link to='/customer'>Customers</Link></li>*/}
          {/*<li><Link to='/car'>Cars</Link></li>*/}
        {/*</ul>*/}
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
    selectTab: bindActionCreators(selectTab, dispatch),
    loadUsers: bindActionCreators(loadUsers, dispatch),
    fetchUser: bindActionCreators(fetchUser, dispatch),
    loadCustomers: bindActionCreators(loadCustomers, dispatch),
    fetchCustomer: bindActionCreators(fetchCustomer, dispatch),
    loadCars: bindActionCreators(loadCars, dispatch),
    fetchCar: bindActionCreators(fetchCar, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
