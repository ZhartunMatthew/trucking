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
        <nav className="navbar navbar-inverse bg-inverse navbar-toggleable-md">
          <a className="navbar-brand" href="#">Trucking</a>
          <div className="collapse navbar-collapse" id="containerNavbar">

            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to='/waybills'>Waybills</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a className="nav-link" href="#">Log out</a></li>
            </ul>
          </div>
        </nav>
        {/*<ul>*/}
          {/*<li><Link to='/waybills'>Waybills</Link></li>*/}
        {/*</ul>*/}
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
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverPage);
