import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadTruckingCompanies, fetchTruckingCompany} from '../actions/truckingCompany.action';
import { cancelOperation } from '../actions/operation.action';
import HeaderComponent from './header';
import FooterComponent from './footer';
import TruckingCompanyComponent from './truckingCompany/truckingCompany-component'
import Modal from './modal/modal'

class SystemAdminPage extends React.Component {

  componentDidMount() {
    this.props.loadTruckingCompanies();
    this.props.cancelCurrentOperation();
  }

  render() {
    let navItems = [{
      url: '/companies',
      caption: 'Trucking companies'
    }];

    let defaultPageInfo = <TruckingCompanyComponent/>;

    return (
        <div>
          <div className="wrapper">
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
