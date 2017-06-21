import React from 'react';
import { connect } from 'react-redux';
import { Role } from '../../constants/roles'

class CheckPointTable extends React.Component {

  render() {
    let rows = null;
    if (this.props.checkPoints) {
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
};

let mapStateToProps = function (state) {
  if(state.userRole.userRole === Role.MANAGER) {
    return {
      checkPoints: state.checkPoints.checkPoints
    };
  }
};

export default connect(mapStateToProps, () => {})(CheckPointTable);
