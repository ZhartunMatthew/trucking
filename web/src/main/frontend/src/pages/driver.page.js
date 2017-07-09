import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cancelOperation } from '../actions/operation.action';
import { loadDriverWaybills } from '../actions/driverWaybills.action';
import HeaderComponent from './header';
import FooterComponent from './footer';
import DriverWaybillComponent from '../components/driverWaybills/driverWaybills-component';
import Modal from '../components/modal/modal';
import { NAV_ITEMS } from '../constants/constants';
import { initialize, terminate } from '../actions/messaging.action';

class DriverPage extends React.Component {

  componentDidMount() {
    this.props.loadDriverWaybills();
    this.props.cancelCurrentOperation();
  }

  componentDidUpdate() {
    initialize('/driver-box', this.props.truckingId);
  }

  componentWillUnmount() {
    terminate();
  }

  render() {
    let navItems = [
      NAV_ITEMS.WAYBILLS
    ];
    let defaultPageInfo = <DriverWaybillComponent/>;
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

let mapStateToProps = function (state) {
  return {
    truckingId: state.currentUser.currentUser.truckingCompanyId
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loadDriverWaybills:bindActionCreators(loadDriverWaybills, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverPage);
