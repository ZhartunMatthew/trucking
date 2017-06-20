import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { startOperation } from '../../actions/operation.action';
import { Role } from '../../constants/roles'

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
        <h3> List of check points </h3>
        <table className='table table-hover'>
          <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
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
  if(state.userRole.userRole === Role.MANAGER) {
    return {
      checkPoints: state.checkPoints.checkPoints
    };
  }
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPointTable);
