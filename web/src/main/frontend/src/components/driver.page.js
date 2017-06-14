import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { cancelOperation } from '../actions/operation.action';
import { Link } from 'react-router';
import {loadDriverWaybills} from "../actions/driverWaybills.action";
import HeaderComponent from './header';
import FooterComponent from './footer';
import DriverWaybillComponent from '../components/driverWaybills/driverWaybills-component';

class DriverPage extends React.Component {

  componentDidMount() {
    this.props.loadDriverWaybills();
    this.props.cancelCurrentOperation();
  }

  render() {
    let navItems = [{
      url: '/waybills',
      caption: 'Waybills'
    }];

    let defaultPageInfo = <DriverWaybillComponent/>;

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
      </div>
      <FooterComponent/>
      </div>
  );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadDriverWaybills:bindActionCreators(loadDriverWaybills, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverPage);
