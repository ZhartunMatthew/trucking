import React from 'react';
import Input from '../common/text-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOperation, cancelOperation } from '../../actions/operation.action';

class ProductForm extends React.Component {

  handleProductNameChange(event) {
    this.props.updateOperation('name', event.target.value);
  }

  handleAmountChange(event) {
    this.props.updateOperation('amount', event.target.value);
  }

  save() {

  }

  cancel() {
    this.props.cancelOperation();
  }

  create() {

  }

  render() {
    let role = this.props.userRole;
    if(role === "DISPATCHER") {
      return (
        <div>
          <form className='form-horizontal'>
            <fieldset>
              <Input id='name' type='text' label='Product name' placeholder='' value='Кампутер' onChange={this.handleProductNameChange.bind(this)}/>
              <Input id='amount' type='text' label='Amount' placeholder='' value='1337' onChange={this.handleAmountChange.bind(this)}/>
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

ProductForm.propTypes = {
  product: React.PropTypes.object.isRequired,
  updateOperation: React.PropTypes.func.isRequired,
  cancelOperation: React.PropTypes.func.isRequired,
  userRole: React.PropTypes.String
};

let mapStateToProps = function (state) {
  return {
    userRole: state.userRole.userRole
  };
};

function mapDispatchToProps(dispatch) {
  return {
    updateOperation: bindActionCreators(updateOperation, dispatch),
    cancelOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
