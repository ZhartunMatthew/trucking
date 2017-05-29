import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, browserHistory, hashHistory } from 'react-router';
import { loadUserRole } from '../actions/userRole.action';
import Error from '../components/error';
import { routes} from './routes';
import { ways} from './ways';
import { dispatcherRoutes} from './dispatcher.routes';
import { managerRoutes} from './manager.routes';

class UserRole extends React.Component {

  componentDidMount() {
    this.props.loadUserRole();
  }

  render() {
    console.log('HERE');
    if (this.props.userRole === 'SYSTEM_ADMIN') {
       return (<Router history={hashHistory} routes={ways} />)
    } else if(this.props.userRole === 'ADMIN') {
      return (<Router history={hashHistory} routes={routes} />)
    } else if(this.props.userRole === "MANAGER") {
      return (<Router history={hashHistory} routes={managerRoutes} />)
    } else if(this.props.userRole === "DISPATCHER") {
      return (<Router history={hashHistory} routes={dispatcherRoutes} />)
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

