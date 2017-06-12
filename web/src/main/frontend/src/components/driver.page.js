import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { cancelOperation } from '../actions/operation.action';
import { Link } from 'react-router';
import {loadDriverWaybills} from "../actions/driverWaybills.action";
import HeaderComponent from './header';
import FooterComponent from './footer';

class DriverPage extends React.Component {

  componentDidMount() {
    this.props.loadDriverWaybills();
    this.props.cancelCurrentOperation();
  }

  render() {
    var navItems = [{
      url: '/waybills',
      caption: 'Waybills'
    }];
    return (
      <div>
      <div className="wrapper">
        <HeaderComponent navItems={navItems}/>
          {this.props.children}
      </div>
      <FooterComponent/>
      </div>
  );
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    loadDriverWaybills:bindActionCreators(loadDriverWaybills, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverPage);
