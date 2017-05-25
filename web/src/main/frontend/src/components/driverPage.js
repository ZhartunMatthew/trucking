import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { cancelOperation } from '../actions/operation.action';
import { Link } from 'react-router';
import {loadDriverWaybills} from "../actions/driverWaybills.action";

class DriverPage extends React.Component {

  componentDidMount() {
    this.props.loadDriverWaybills();
    this.props.cancelCurrentOperation();
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to='/waybills'>Waybills</Link></li>
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
    loadDriverWaybills:bindActionCreators(loadDriverWaybills, dispatch),
    // fetchTruckingCompany: bindActionCreators(fetchTruckingCompany, dispatch),
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverPage);
