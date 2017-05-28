import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { startOperation } from '../../actions/operation.action';

class CheckPointTable extends React.Component {

  constructor(props) {
    super(props);
  }

  onShowUpdateCheckPointForm(checkPoint) {
    this.props.startOperation(checkPoint);
  }

  onShowCreateCheckPointForm() {
  }

  render() {
    let rows = this.props.waybill.checkPoints.map((checkPoint, index) => {
      return (
        <tr key={checkPoint.id}>
          <th scope='row'> {index + 1} </th>
          <td> {checkPoint.description}</td>
          <td>
            <div className='btn-toolbar text-center'>
              <button className='btn btn-primary' onClick={this.onShowUpdateCheckPointForm.bind(this, checkPoint)}>Update</button>
            </div>
          </td>
        </tr>
      )
    });
    return (
      <div>
        <h1>List of checkPoints</h1>
        <table className='table table-hover'>
          <thead>
          <tr>
            <th>#</th>
            <th>description</th>
          </tr>
          </thead>
          <tbody>
          {rows}
          <tr>
            <td colSpan={3}>
              <button className='btn btn-default' onClick={this.onShowCreateCheckPointForm.bind(this)}>Create new check point
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

CheckPointTable.propTypes = {
  waybill: React.PropTypes.object.isRequired,
  startOperation: React.PropTypes.func.isRequired,
};


let mapStateToProps = function (state) {
  return {
    waybill: state.operation.modifiedValue
  };
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPointTable);


