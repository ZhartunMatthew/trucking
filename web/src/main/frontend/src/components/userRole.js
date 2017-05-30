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
import {driverNavigation} from './driverNavigation'


class UserRole extends React.Component {

  componentDidMount() {
    this.props.loadUserRole();
  }

  render() {

    if (this.props.userRole === 'SYSTEM_ADMIN') {
       return (<Router history={hashHistory} routes={ways} />)
    } else if(this.props.userRole === 'ADMIN') {
      return (<Router history={hashHistory} routes={routes} />)
    } else if(this.props.userRole === "MANAGER") {
      return (<Router history={hashHistory} routes={managerRoutes} />)
    } else if(this.props.userRole === "DISPATCHER") {
      return (<Router history={hashHistory} routes={dispatcherRoutes} />)
    }  else if(this.props.userRole === "COMPANY_OWNER") {
      return (<Router history={hashHistory} routes={ownerRoutes} />)
    } else if (this.props.userRole === "DRIVER") {
      return (<Router history={hashHistory} routes={driverNavigation}/>)
    } else {
      return (<Error/>)
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

