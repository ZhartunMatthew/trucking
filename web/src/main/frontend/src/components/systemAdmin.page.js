import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTab } from '../actions/navigation.action';
import { loadTruckingCompanies, fetchTruckingCompany} from '../actions/truckingCompany.action';
import { cancelOperation } from '../actions/operation.action';
import { Link } from 'react-router';
import HeaderComponent from './header';

class SystemAdminPage extends React.Component {

  componentDidMount() {
    this.props.loadTruckingCompanies();
    this.props.cancelCurrentOperation();
  }

  render() {
    var navItems = [{
      url: '/companies',
      caption: 'Trucking companies'
    }];
    return (
        <div>
          <HeaderComponent navItems={navItems}/>
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
    loadTruckingCompanies: bindActionCreators(loadTruckingCompanies, dispatch),
    fetchTruckingCompany: bindActionCreators(fetchTruckingCompany, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdminPage);
