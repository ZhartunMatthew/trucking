import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, browserHistory, hashHistory } from 'react-router';
import { loadUserRole } from '../actions/userRole.action';
import Error from '../components/error';
import { adminRoutes} from './admin.routes';
import { systemAdminRoutes} from './systemAdmin.routes';
import { dispatcherRoutes} from './dispatcher.routes';
import { managerRoutes} from './manager.routes';
import { ownerRoutes} from './companyOwner.routes';
import {driverRoutes} from './driver.routes'


class UserRole extends React.Component {

  componentDidMount() {
    this.props.loadUserRole();
  }

  render() {
    switch (this.props.userRole) {
      case "SYSTEM_ADMIN":
        return (
          <Router history={hashHistory} routes={systemAdminRoutes} />
        );
      case "ADMIN":
        return (
          <Router history={hashHistory} routes={adminRoutes} />
        );
      case "MANAGER":
        return (
          <Router history={hashHistory} routes={managerRoutes} />
        );
      case "DISPATCHER":
        return (
          <Router history={hashHistory} routes={dispatcherRoutes} />
        );
      case "DRIVER":
        return (
          <Router history={hashHistory} routes={driverRoutes} />
        );
      case "COMPANY_OWNER":
        return (
          <Router history={hashHistory} routes={ownerRoutes} />
        );
      default:
        return (
          <Error/>
        )
    }
  }
}

let mapStateToProps = function (state) {
  return {
    userRole: state.userRole.userRole

  };
};

function mapDispatchToProps(dispatch) {
  return {
    loadUserRole: bindActionCreators(loadUserRole, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRole);

