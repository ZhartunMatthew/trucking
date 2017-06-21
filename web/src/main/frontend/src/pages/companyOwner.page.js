import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTab } from '../actions/navigation.action';
import { loadUsers } from '../actions/user.action';
import { loadCustomers } from '../actions/customer.action';
import { loadCars } from '../actions/car.action';
import { loadInvoices } from '../actions/invoice.action';
import { cancelOperation } from '../actions/operation.action';
import { loadWaybills } from '../actions/waybill.action';
import { loadHighcharts } from '../actions/highcharts.action';
import HeaderComponent from './header';
import FooterComponent from './footer';
import UserComponent from '../components/user/user-component';
import Modal from '../components/modal/modal';
import { NAV_ITEMS } from '../constants/constants';

class CompanyOwnerPage extends React.Component {

  componentDidMount() {
    this.props.cancelCurrentOperation();
    this.props.loadUsers();
    this.props.loadCustomers();
    this.props.loadCars();
    this.props.loadInvoices();
    this.props.loadWaybills();
    this.props.loadHighcharts();
  }

  render() {
    let navItems = [
      NAV_ITEMS.USERS,
      NAV_ITEMS.CUSTOMERS,
      NAV_ITEMS.CARS,
      NAV_ITEMS.INVOICES,
      NAV_ITEMS.WAYBILLS,
      NAV_ITEMS.REPORT
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
    selectTab: bindActionCreators(selectTab, dispatch),
    loadUsers: bindActionCreators(loadUsers, dispatch),
    loadCustomers: bindActionCreators(loadCustomers, dispatch),
    loadCars: bindActionCreators(loadCars, dispatch),
    loadInvoices: bindActionCreators(loadInvoices, dispatch),
    loadWaybills: bindActionCreators(loadWaybills, dispatch),
    loadHighcharts: bindActionCreators(loadHighcharts, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyOwnerPage);


