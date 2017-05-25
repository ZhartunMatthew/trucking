import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, browserHistory, hashHistory } from 'react-router';
import { loadUserRole } from '../actions/userRole.action';
import Error from '../components/error';
import {routes} from './routes';
import {ways} from './ways';
import {driverNavigation} from './driverNavigation'


class UserRole extends React.Component {

  componentDidMount() {
    this.props.loadUserRole();
  }

  render() {
    console.log('HERE');
    switch (this.props.userRole) {
      case 'SYSTEM_ADMIN':
        return (
          <Router history={hashHistory} routes={ways} />
        );
      case 'ADMIN':
        return (
          <Router history={hashHistory} routes={routes} />
        );
      case 'DRIVER':
        return (
          <Router history={hashHistory} routes={driverNavigation} />
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

