import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, hashHistory } from 'react-router';
import { loadUserRole, loadCurrentUser } from '../actions/userRole.action';
import ErrorPage from './error';
import { adminRoutes} from '../routes/admin.routes';
import { systemAdminRoutes} from '../routes/systemAdmin.routes';
import { dispatcherRoutes} from '../routes/dispatcher.routes';
import { managerRoutes} from '../routes/manager.routes';
import { ownerRoutes} from '../routes/companyOwner.routes';
import { driverRoutes} from '../routes/driver.routes'
import LoginPage from './login.page';
import { Role } from '../constants/roles';

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
          <ErrorPage/>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRole);

