import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadUsers, fetchUser } from '../actions/user.action';
import { loadCustomers, fetchCustomer } from '../actions/customer.action';
import { loadCars, fetchCar } from '../actions/car.action';
import { cancelOperation } from '../actions/operation.action';
import HeaderComponent from './header';
import FooterComponent from './footer';
import UserTable from '../components/user/user-table'

class AdminPage extends React.Component {

  componentDidMount() {
    this.props.loadUsers();
    this.props.cancelCurrentOperation();
    this.props.loadCustomers();
    this.props.loadCars();
  }

  render() {
    let navItems = [{
      url: '/user',
      caption: 'Users'
    },
    {
      url: '/customer',
      caption: 'Customers'
    },
    {
      url: '/car',
      caption: 'Cars'
    }];

    let defaultPageInfo =
      <div className='container'>
        <div className='row'>
          <div className='col align-self-center'>
            <UserTable users={this.props.users}/>
          </div>
        </div>
      </div>;

    return (
      <div>
        <div className="wrapper">
          <HeaderComponent navItems={navItems}/>
          {
            !this.props.children && defaultPageInfo
          }
          {this.props.children}
        </div>
        <FooterComponent/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
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
