import React from 'react';
import Input from '../common/text-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOperation, cancelOperation } from '../../actions/operation.action';
import { updateProducts } from  '../../actions/product.action';

class ProductForm extends React.Component {

  handleProductNameChange(event) {
    this.props.updateOperation('currentProductName', event.target.value);
  }

  handleAmountChange(event) {
    this.props.updateOperation('currentProductAmount', event.target.value);
  }

  save() {

  }

  cancel() {
    this.props.cancelOperation();
  }

  create() {
    let productItem = {
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
    if(role === "DISPATCHER") {
      return (
        <div>
          <form className='form-horizontal'>
            <fieldset>
              <Input id='currentProductName' type='text' label='Product name' placeholder='' value={this.props.currentProductName} onChange={this.handleProductNameChange.bind(this)}/>
              <Input id='currentProductAmount' type='text' label='Amount' placeholder='' value={this.props.currentProductAmount} onChange={this.handleAmountChange.bind(this)}/>
              <div className='btn-toolbar text-center'>
                <div className='btn-group' role='group'>
                  <button type='button' className='btn btn-success' onClick={this.create.bind(this)}> Add </button>
                  {/*<button type='button' className='btn btn-success' onClick={this.cancel.bind(this)}> Close </button>*/}
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
}

// ProductForm.propTypes = {
//   updateOperation: React.PropTypes.func.isRequired,
//   cancelOperation: React.PropTypes.func.isRequired,
//   updateProducts: React.PropTypes.func.isRequired,
//   userRole: React.PropTypes.String,
//   currentProductName: React.PropTypes.String,
//   currentProductAmount: React.PropTypes.String
// };

let mapStateToProps = function (state) {
  return {
    userRole: state.userRole.userRole,
    currentProductName: state.operation.modifiedValue === null ?
          '' : state.operation.modifiedValue.currentProductName,

    currentProductAmount: state.operation.modifiedValue === null ?
          '' : state.operation.modifiedValue.currentProductAmount
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
