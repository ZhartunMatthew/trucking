import React from 'react';
import {connect} from 'react-redux';

class FooterComponent extends React.Component {

  render() {
    return (
      <div className="container">
        <hr></hr>
        <footer>
          <p>&copy; 2017 iTechArt JavaLab</p>
        </footer>
      </div>
    )
  }
}

export default connect()(FooterComponent);
