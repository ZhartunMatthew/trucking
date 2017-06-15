import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { startOperation, updateOperation } from '../../actions/operation.action';
import { Role } from '../../constants/roles'
import { deleteProduct } from '../../actions/product.action'

class ProductTable extends React.Component {

  onDeleteProduct(id) {
    this.props.deleteProduct(id);
    this.props.updateOperation(null, {});
  }

  render() {
    let rows = null;
    if(this.props.products !== undefined && this.props.products !== null) {
      if(this.props.userRole === Role.DISPATCHER) {
        rows = this.props.products.map((product, index) => {
          return (
            <tr key={product.id}>
              <th scope='row'> {index + 1} </th>
              <td> {product.name}</td>
              <td> {product.amount}</td>
              <td> {product.price}</td>
              <td>
                <div className='btn-toolbar text-center'>
                  <button className='btn btn-danger'
                          onClick={this.onDeleteProduct.bind(this, product.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          )});
      } else {
        rows = this.props.products.map((product, index) => {
          return (
            <tr key={product.id}>
              <th scope='row'> {index + 1} </th>
              <td> {product.name}</td>
              <td> {product.amount}</td>
              <td> {product.price}</td>
            </tr>
          )});
      }
    }
    let actionHeader =
      this.props.userRole === Role.DISPATCHER ? <th> Action </th> : null;
    return (
      <div>
        <h1> List of products </h1>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th> # </th>
              <th> Name </th>
              <th> Amount </th>
              <th> Price </th>
              {actionHeader}
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
      products: state.products.products,
      userRole: state.userRole.userRole
    };
  }
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch),
    updateOperation: bindActionCreators(updateOperation, dispatch),
    deleteProduct: bindActionCreators(deleteProduct, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);


