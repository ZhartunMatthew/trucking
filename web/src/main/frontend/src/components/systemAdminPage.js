import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTab } from '../actions/navigation.action';
import { loadTruckingCompanies, fetchTruckingCompany} from '../actions/truckingCompany.action';
import { loadUsers, fetchUser } from '../actions/user.action';
import { cancelOperation } from '../actions/operation.action';
import { Link } from 'react-router';
import {
  NAVIGATION_TAB_GENRES
} from '../constants/constants';

class SystemAdminPage extends React.Component {

  componentDidMount() {
    this.props.selectTab(NAVIGATION_TAB_GENRES);
    this.props.loadTruckingCompanies();
    this.props.loadUsers();
    this.props.cancelCurrentOperation();
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to='/companies'>Trucking companies</Link></li>
        </ul>
        {this.props.children}
      </div>
  );
  }
}
/*
 We don't need copy anything to props from app state here
 */
function mapStateToProps() {
  return {}
}

/*
 Here we assign handlers to some actions
 */
function mapDispatchToProps(dispatch) {
  return {
    selectTab: bindActionCreators(selectTab, dispatch),
    loadTruckingCompanies: bindActionCreators(loadTruckingCompanies, dispatch),
    fetchTruckingCompany: bindActionCreators(fetchTruckingCompany, dispatch),
    loadUsers: bindActionCreators(loadUsers, dispatch),
    fetchUser: bindActionCreators(fetchUser, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdminPage);
