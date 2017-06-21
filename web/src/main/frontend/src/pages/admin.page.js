import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadUsers, fetchUser } from '../actions/user.action';
import { loadCustomers, fetchCustomer } from '../actions/customer.action';
import { loadCars, fetchCar } from '../actions/car.action';
import { startOperation, cancelOperation } from '../actions/operation.action';
import HeaderComponent from './header';
import FooterComponent from './footer';
import UserComponent from '../components/user/user-component';
import Modal from '../components/modal/modal';
import { NAV_ITEMS } from '../constants/constants';

class AdminPage extends React.Component {

  componentDidMount() {
    this.props.cancelCurrentOperation();
    this.props.loadUsers();
    this.props.loadCustomers();
    this.props.loadCars();
  }

  render() {
    let navItems = [
      NAV_ITEMS.USERS,
      NAV_ITEMS.CUSTOMERS,
      NAV_ITEMS.CARS
    ];
    let defaultPageInfo = <UserComponent/>;
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
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch),
    startOperation: bindActionCreators(startOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
