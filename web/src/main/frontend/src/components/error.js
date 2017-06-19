import React from 'react';
import {connect} from 'react-redux';

class ErrorPage extends React.Component {

  render() {
    return (
      <div> Error </div>
    )
  }
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps)(ErrorPage);
