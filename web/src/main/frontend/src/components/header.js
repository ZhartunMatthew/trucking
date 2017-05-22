import React from 'react';
import { connect } from 'react-redux';
import {
  NAVIGATION_TAB_GENRES
} from '../constants/constants';

class HeaderComponent extends React.Component {

  render() {
    return (
      <header>
        <div className='row'>
          <div className='col-xs-12'>
            <nav className='navbar navbar-toggleable-md navbar-light bg-faded' role='navigation'>

              <img alt='Logo' src='src/images/logo.png' style={{width:'100px', height: '70px'}}></img>

              <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav'>
                  <li className={this.props.activeItem === NAVIGATION_TAB_GENRES ? 'nav-item active' : 'nav-item'}>
                    <a>Trucking</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

HeaderComponent.propTypes = {
  activeItem: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    activeItem: state.navigation.currentTab
  }
}

export default connect(mapStateToProps)(HeaderComponent);
