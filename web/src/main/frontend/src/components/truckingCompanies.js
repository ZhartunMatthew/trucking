import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTab } from '../actions/navigation.action';
import { loadTruckingCompanies, fetchTruckingCompany} from '../actions/truckingCompany.action';
import { cancelOperation } from '../actions/operation.action';
import IndexComponent from './index';
import TruckingCompanyComponent from './truckingCompany/truckingCompany-component';
import {
  NAVIGATION_TAB_GENRES
} from '../constants/constants';

class TruckingCompaniesPage extends React.Component {

  componentDidMount() {
    this.props.selectTab(NAVIGATION_TAB_GENRES);
    this.props.loadTruckingCompanies();
    this.props.cancelCurrentOperation();
  }

  render() {
    return (
      <IndexComponent>
        <TruckingCompanyComponent />
      </IndexComponent>
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
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TruckingCompaniesPage);
