import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import {logOut} from "../actions/authorization.action";

class HeaderComponent extends React.Component {

  onLogOut() {
    this.props.logOut();
  }

  render() {
    let navItems = this.props.navItems.map((item)=> {
      return (
        <li className="nav-item active">
          <Link className="nav-link" to={item.url}>{item.caption}</Link>
        </li>
      )
    });
    return (
        <nav className="navbar navbar-inverse bg-inverse navbar-toggleable-xl">
          <a className="navbar-brand" href="#">Trucking</a>
          <ul className="navbar-nav mr-auto">
            {navItems}
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a className="nav-link" href="#" onClick={this.onLogOut.bind(this)}> Log out </a>
            </li>
          </ul>
        </nav>
    );
  }
}

HeaderComponent.propTypes = {
  navItems: React.PropTypes.array.isRequired,
  logOut: React.PropTypes.func
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    logOut: bindActionCreators(logOut, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
