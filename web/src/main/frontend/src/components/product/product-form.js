import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOperation } from '../../actions/operation.action';
import { updateProducts } from  '../../actions/product.action';
import { Role } from '../../constants/roles';
import ValidatedInput from '../common/input';
import Formsy from 'formsy-react';
import { VALIDATION_ERRORS, MAX_LENGTH_OF_STRING, MAX_LENGTH_OF_NUMERIC,
  PRODUCT_STATE } from '../../constants/constants';

class ProductForm extends React.Component {

  constructor() {
    super();
    this.state = {
      errors: {},
      canSubmit: false
    };
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  handleProductNameChange(event) {
    this.props.updateOperation('currentProductName', event.target.value);
  }

  handleAmountChange(event) {
    this.props.updateOperation('currentProductAmount', event.target.value);
  }

  handlePriceChange(event) {
    this.props.updateOperation('currentProductPrice', event.target.value);
  }

  create() {
    let productItem = {
      id: this.getLastProductId() + 1,
      name: '',
      amount: 0,
      price: 0,
      productState: PRODUCT_STATE.REGISTERED
    };
    productItem.amount = this.props.currentProductAmount;
    productItem.name = this.props.currentProductName;
    productItem.price = this.props.currentProductPrice;
    this.props.updateProducts(productItem);
    this.props.updateOperation(null, {});
    this.props.updateOperation('currentProductName', '');
    this.props.updateOperation('currentProductAmount', '');
    this.props.updateOperation('currentProductPrice', '');
  }

  render() {
    Formsy.addValidationRule('isName', function(values, value) {
      return !(/(\s){2,}/g.test(value));
    });

    Formsy.addValidationRule('isPositiveNumber', function(values, value) {
      return Number(value) > 0;
    });

    let role = this.props.userRole;
    if (role === Role.DISPATCHER) {
      return (
        <div>
          <Formsy.Form className='form-horizontal'
                       onValid={this.enableButton.bind(this)}
                       onInvalid={this.disableButton.bind(this)}>
            <fieldset>
              <ValidatedInput id='currentProductName'
                              type='text'
                              placeholder='Enter product name here'
                              value={this.props.currentProductName}
                              onChange={this.handleProductNameChange.bind(this)}
                              validations={{
                                isName: true,
                                maxLength: MAX_LENGTH_OF_STRING
                              }}
                              validaionsErrors={{
                                isName: VALIDATION_ERRORS.TO_MUCH_SPACES_IN_A_ROW,
                                maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                              }}
                              required
                              name='currentProductName'
                              title='Product name'/>

              <ValidatedInput id='currentProductAmount'
                              type='text'
                              placeholder='Enter products amount here'
                              value={this.props.currentProductAmount}
                              onChange={this.handleAmountChange.bind(this)}
                              validations={{
                                isNumeric: true,
                                isPositiveNumber: true,
                                maxLength: MAX_LENGTH_OF_NUMERIC
                              }}
                              validationErrors={{
                                isNumeric: VALIDATION_ERRORS.DIGITS,
                                isPositiveNumber: VALIDATION_ERRORS.POSITIVE_NUMBER,
                                maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_NUMERIC
                              }}
                              required
                              name='currentProductAmount'
                              title='Amount, pcs'/>

              <ValidatedInput id='currentProductPrice'
                              type='text'
                              placeholder='Enter price here'
                              value={this.props.currentProductPrice}
                              onChange={this.handlePriceChange.bind(this)}
                              required
                              name='currentProductPrice'
                              title='Price, $'
                              validations={{
                                isNumeric: true,
                                isPositiveNumber: true,
                                maxLength: MAX_LENGTH_OF_NUMERIC
                              }}
                              validationErrors={{
                                isNumeric: VALIDATION_ERRORS.DIGITS,
                                isPositiveNumber: VALIDATION_ERRORS.POSITIVE_NUMBER,
                                maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_NUMERIC
                              }}/>

              <div className='btn-toolbar text-center'>
                <div className='btn-group' role='group'>
                  <button type='button'
                          className='btn btn-success'
                          onClick={this.create.bind(this)}
                          disabled={!this.state.canSubmit}> Add </button>
                </div>
              </div>
            </fieldset>
          </Formsy.Form>
        </div>
      );
    } else {
      return null;
    }
  }

  getLastProductId() {
    let list = this.props.productList;
    console.log(list);
    if (list.length < 1) {
      return 0;
    } else {
      return list[list.length - 1].id;
    }
  }
}

ProductForm.propTypes = {
  updateOperation: React.PropTypes.func.isRequired,
  updateProducts: React.PropTypes.func.isRequired,
  userRole: React.PropTypes.string,
  currentProductName: React.PropTypes.string,
  currentProductAmount: React.PropTypes.string,
  currentProductPrice: React.PropTypes.string
};

let mapStateToProps = function (state) {
  return {
    userRole: state.userRole.userRole,
    currentProductName: state.operation.modifiedValue === null ?
          '' : state.operation.modifiedValue.currentProductName,

    currentProductAmount: state.operation.modifiedValue === null ?
          '' : state.operation.modifiedValue.currentProductAmount,

    currentProductPrice: state.operation.modifiedValue === null ?
      '' : state.operation.modifiedValue.currentProductPrice,
    productList: state.products.products
  };
};

function mapDispatchToProps(dispatch) {
  return {
    updateOperation: bindActionCreators(updateOperation, dispatch),
    updateProducts: bindActionCreators(updateProducts,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
