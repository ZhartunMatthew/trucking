import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOperation, cancelOperation } from '../../actions/operation.action';
import { updateCheckPoints } from  '../../actions/checkPoint.action';
import MyInput from '../common/input';
import Formsy from 'formsy-react';

class CheckPointForm extends React.Component {

  constructor() {
    super();

    this.state = {
      errors: {},
      canSubmit: false
    };
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  handleCheckPointDescriptionChange(event) {
    this.props.updateOperation('currentCheckPointDescription', event.target.value);
  }

  onKeyPress(event) {
    if (event.which === 13) {
      event.preventDefault();
    }
  }

  create() {
    let checkPoint = {
      description: '',
    };
    checkPoint.description = this.props.currentCheckPointDescription;
    this.props.updateCheckPoints(checkPoint);
    this.props.updateOperation(null, {});
    this.props.updateOperation('currentCheckPointDescription', '');
  }

  render() {
    return (
      <div>
        <Formsy.Form className='form-horizontal' onKeyPress={this.onKeyPress.bind(this)} onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)}>
          <fieldset>
            <MyInput id='currentCheckPointDescription' type='text' label='Check point name' placeholder='' title='Check point name'
                   value={this.props.currentCheckPointDescription} onChange={this.handleCheckPointDescriptionChange.bind(this)}
                     name="name" required validations='isAlpha' validationError='This field must contain only letters'/>
            <div className='btn-toolbar text-center'>
              <div className='btn-group' role='group'>
                <button type='button' className='btn btn-success' onClick={this.create.bind(this)} disabled={!this.state.canSubmit}> Add </button>
              </div>
            </div>
          </fieldset>
        </Formsy.Form>
      </div>
    );
  }
}

CheckPointForm.propTypes = {
  updateOperation: React.PropTypes.func.isRequired,
  cancelOperation: React.PropTypes.func.isRequired,
  updateCheckPoints: React.PropTypes.func.isRequired,
  currentCheckPointDescription: React.PropTypes.String
};

let mapStateToProps = function (state) {
  return {
    currentCheckPointDescription: state.operation.modifiedValue === null ?
      '' : state.operation.modifiedValue.currentCheckPointDescription,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    updateOperation: bindActionCreators(updateOperation, dispatch),
    cancelOperation: bindActionCreators(cancelOperation, dispatch),
    updateCheckPoints: bindActionCreators(updateCheckPoints,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPointForm);
