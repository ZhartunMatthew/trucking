import React from 'react';
import {connect} from 'react-redux';


class Error extends React.Component {


  render() {
    return (

      <div>Error</div>

    )
  }
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps)(Error);
