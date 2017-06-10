import React from 'react';
import Input from '../common/text-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOperation, cancelOperation } from '../../actions/operation.action';
import { updateCheckPoints } from  '../../actions/checkPoint.action';

class CheckPointForm extends React.Component {

  handleCheckPointDescriptionChange(event) {
    this.props.updateOperation('currentCheckPointDescription', event.target.value);
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
          <form className='form-horizontal'>
            <fieldset>
              <Input id='currentCheckPointDescription' type='text' label='Check point name' placeholder=''
                     value={this.props.currentCheckPointDescription} onChange={this.handleCheckPointDescriptionChange.bind(this)}/>
              <div className='btn-toolbar text-center'>
                <div className='btn-group' role='group'>
                  <button type='button' className='btn btn-success' onClick={this.create.bind(this)}> Add </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      );
  }
}

CheckPointForm.propTypes = {
  updateOperation: React.PropTypes.func.isRequired,
  cancelOperation: React.PropTypes.func.isRequired,
  updateCheckPoints: React.PropTypes.func.isRequired,
  currentCheckPointDescription: React.PropTypes.String,
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
