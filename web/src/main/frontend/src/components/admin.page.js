import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadUsers, fetchUser } from '../actions/user.action';
import { loadCustomers, fetchCustomer } from '../actions/customer.action';
import { loadCars, fetchCar } from '../actions/car.action';
import { cancelOperation } from '../actions/operation.action';
import HeaderComponent from './header';
import FooterComponent from './footer';

class AdminPage extends React.Component {

  componentDidMount() {
    this.props.loadUsers();
    this.props.cancelCurrentOperation();
    this.props.loadCustomers();
    this.props.loadCars();
  }

  render() {
    var navItems = [{
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
    return (
      <div>
        <HeaderComponent navItems={navItems}/>
        {this.props.children}
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
