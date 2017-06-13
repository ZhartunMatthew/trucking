import React from 'react';
import {connect} from 'react-redux';
import ProductForm from '../product/product-form';
import ProductTable from '../product/product-table';
import { Role } from '../../constants/roles'

class ProductComponent extends React.Component {

  render() {
    let role = this.props.userRole;
    let productForm = null;
    if(role === Role.DISPATCHER) {
      productForm = <ProductForm/>;
    } else {
      productForm = null;
    }

    let content =
      <div className='col'>
        <div className='col-sm-8'>
          <ProductTable/>
        </div>
        <div className='col-sm-8'>
          {productForm}
        </div>
      </div>;

    return (
      <div> {content} </div>
    );
  }
}

let mapStateToProps = function (state) {
  return {
    userRole: state.userRole.userRole
  }
};

export default connect(mapStateToProps, () => {})(ProductComponent);
