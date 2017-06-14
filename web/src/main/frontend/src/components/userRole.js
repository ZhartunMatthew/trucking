import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, browserHistory, hashHistory } from 'react-router';
import { loadUserRole, loadCurrentUser } from '../actions/userRole.action';
import Error from '../components/error';
import { adminRoutes} from './admin.routes';
import { systemAdminRoutes} from './systemAdmin.routes';
import { dispatcherRoutes} from './dispatcher.routes';
import { managerRoutes} from './manager.routes';
import { ownerRoutes} from './companyOwner.routes';
import { driverRoutes} from './driver.routes'
import { LoginPage} from "./login.page";
import { startOperation } from '../actions/operation.action'
import { Role } from '../constants/roles'

class UserRole extends React.Component {

  constructor(props) {
    super(props);
    this.props.loadUserRole();
    this.props.loadCurrentUser();
  }

  render() {
    switch (this.props.userRole) {
      case Role.SYSTEM_ADMIN:
        return (
          <Router history={hashHistory} routes={systemAdminRoutes} />
        );
      case Role.ADMIN:
        return (
          <Router history={hashHistory} routes={adminRoutes} />
        );
      case Role.MANAGER:
        return (
          <Router history={hashHistory} routes={managerRoutes} />
        );
      case Role.DISPATCHER:
        return (
          <Router history={hashHistory} routes={dispatcherRoutes} />
        );
      case Role.DRIVER:
        return (
          <Router history={hashHistory} routes={driverRoutes} />
        );
      case Role.COMPANY_OWNER:
        return (
          <Router history={hashHistory} routes={ownerRoutes} />
        );
      case Role.UNKNOWN_USER:
        return (
          <LoginPage/>
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
  }
};

function mapDispatchToProps(dispatch) {
  return {
    loadUserRole: bindActionCreators(loadUserRole, dispatch),
    loadCurrentUser: bindActionCreators(loadCurrentUser, dispatch),
    startOperation: bindActionCreators(startOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRole);

