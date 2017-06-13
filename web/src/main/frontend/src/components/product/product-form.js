import React from 'react';
import Input from '../common/text-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOperation, cancelOperation } from '../../actions/operation.action';
import { updateProducts } from  '../../actions/product.action';
import { Role } from '../../constants/roles'

class ProductForm extends React.Component {

  handleProductNameChange(event) {
    this.props.updateOperation('currentProductName', event.target.value);
  }

  handleAmountChange(event) {
    this.props.updateOperation('currentProductAmount', event.target.value);
  }

  cancel() {
    this.props.cancelOperation();
  }

  create() {
    let productItem = {
      id: this.getLastProductId() + 1,
      name: '',
      amount: 0,
      productState: 'REGISTERED'
    };
    productItem.amount = this.props.currentProductAmount;
    productItem.name = this.props.currentProductName;
    this.props.updateProducts(productItem);
    this.props.updateOperation(null, {});
    this.props.updateOperation('currentProductName', '');
    this.props.updateOperation('currentProductAmount', '');
  }

  render() {
    let role = this.props.userRole;
    if(role === Role.DISPATCHER) {
      return (
        <div>
          <form className='form-horizontal'>
            <fieldset>
              <Input id='currentProductName' type='text' label='Product name' placeholder='' value={this.props.currentProductName} onChange={this.handleProductNameChange.bind(this)}/>
              <Input id='currentProductAmount' type='text' label='Amount' placeholder='' value={this.props.currentProductAmount} onChange={this.handleAmountChange.bind(this)}/>
              <div className='btn-toolbar text-center'>
                <div className='btn-group' role='group'>
                  <button type='button' className='btn btn-success' onClick={this.create.bind(this)}> Add </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      );
    } else {
      return null;
    }
  }

  getLastProductId() {
    let list = this.props.productList;
    console.log(list);
    if(list.length < 1) {
      return 0;
    } else {
      return list[list.length-1].id;
    }
  }
}

ProductForm.propTypes = {
  updateOperation: React.PropTypes.func.isRequired,
  cancelOperation: React.PropTypes.func.isRequired,
  updateProducts: React.PropTypes.func.isRequired,
  userRole: React.PropTypes.String,
  currentProductName: React.PropTypes.String,
  currentProductAmount: React.PropTypes.String
};

let mapStateToProps = function (state) {
  return {
    userRole: state.userRole.userRole,
    currentProductName: state.operation.modifiedValue === null ?
          '' : state.operation.modifiedValue.currentProductName,

    currentProductAmount: state.operation.modifiedValue === null ?
          '' : state.operation.modifiedValue.currentProductAmount,
    productList: state.products.products
  };
};

function mapDispatchToProps(dispatch) {
  return {
    updateOperation: bindActionCreators(updateOperation, dispatch),
    cancelOperation: bindActionCreators(cancelOperation, dispatch),
    updateProducts: bindActionCreators(updateProducts,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
