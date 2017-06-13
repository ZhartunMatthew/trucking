import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { startOperation } from '../../actions/operation.action';
import { Role } from '../../constants/roles'

class ProductTable extends React.Component {

  render() {
    let rows = null;
    if(this.props.products !== undefined && this.props.products !== null) {
      rows = this.props.products.map((product, index) => {
        return (
          <tr key={index + 1}>
            <th scope='row'> {index + 1} </th>
            <td> {product.name}</td>
            <td> {product.amount}</td>
          </tr>
        )
      });
    }
    return (
      <div>
        <h1> List of products </h1>
        <table className='table table-hover'>
          <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>amount</th>
          </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }

  shouldComponentUpdate(nextState, nextProp) {
    return true;
  }
}

ProductTable.propTypes = {
  products: React.PropTypes.array.isRequired,
  startOperation: React.PropTypes.func.isRequired
};

let mapStateToProps = function (state) {
  if(state.userRole.userRole === Role.DISPATCHER) {
    return {
      products: state.products.products
    };
  }
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);


