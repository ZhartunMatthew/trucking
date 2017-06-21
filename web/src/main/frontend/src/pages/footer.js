import React from 'react';
import {connect} from 'react-redux';

class FooterComponent extends React.Component {

  render() {
    return (
      <footer className="footer">
        <div className="container">
          <p className="text-muted">&copy; 2017 iTechArt Trucking</p>
        </div>
      </footer>
    )
  }
}

export default connect()(FooterComponent);
