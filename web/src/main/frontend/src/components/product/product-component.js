import React from 'react';
import { connect } from 'react-redux';
import ProductForm from '../product/product-form';
import ProductTable from '../product/product-table';
import { Role } from '../../constants/roles'

class ProductComponent extends React.Component {

  render() {
    let productForm = this.props.userRole === Role.DISPATCHER ? <ProductForm/> : null;
    let content =
      <div className='col'>
        <div>
          <ProductTable/>
        </div>
        <div>
          {productForm}
        </div>
      </div>;

    return (
      <div>
        {content}
      </div>
    );
  }
}

let mapStateToProps = function (state) {
  return {
    userRole: state.userRole.userRole
  }
};

export default connect(mapStateToProps, () => {})(ProductComponent);
