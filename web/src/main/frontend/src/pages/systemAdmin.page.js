import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadTruckingCompanies } from '../actions/truckingCompany.action';
import { cancelOperation } from '../actions/operation.action';
import HeaderComponent from './header';
import FooterComponent from './footer';
import TruckingCompanyComponent from '../components/truckingCompany/truckingCompany-component';
import Modal from '../components/modal/modal';
import { NAV_ITEMS } from '../constants/constants';

class SystemAdminPage extends React.Component {

  componentDidMount() {
    this.props.loadTruckingCompanies();
    this.props.cancelCurrentOperation();
  }

  render() {
    let navItems = [
      NAV_ITEMS.TRUCKING_COMPANIES
    ];
    let defaultPageInfo = <TruckingCompanyComponent/>;
    return (
        <div>
          <div className='wrapper'>
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

function mapDispatchToProps(dispatch) {
  return {
    loadTruckingCompanies: bindActionCreators(loadTruckingCompanies, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(() => {}, mapDispatchToProps)(SystemAdminPage);
