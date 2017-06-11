import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { startOperation } from '../../actions/operation.action';

class CheckPointTable extends React.Component {

  render() {
    let rows = null;
    if(this.props.checkPoints !== undefined && this.props.checkPoints !== null) {
      rows = this.props.checkPoints.map((checkPoint, index) => {
        return (
          <tr key={index + 1}>
            <th scope='row'> {index + 1} </th>
            <td> {checkPoint.description}</td>
          </tr>
        )
      });
    }
    return (
      <div>
        <h1> List of check points </h1>
        <table className='table table-hover'>
          <thead>
          <tr>
            <th>#</th>
            <th>description</th>
          </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

CheckPointTable.propTypes = {
  checkPoints: React.PropTypes.array.isRequired,
  startOperation: React.PropTypes.func.isRequired
};

let mapStateToProps = function (state) {
  return {
    checkPoints: state.checkPoints.checkPoints
  };
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPointTable);
