import React from 'react';
import Formsy from 'formsy-react';
import { DEFAULT_SELECT_VALUE } from '../../constants/constants';

const ValidatedSelect = React.createClass({

  mixins: [Formsy.Mixin],

  changeValue(event) {
    this.setValue(event.currentTarget.value);
  },

  render() {
    const className = 'form-group' + (this.props.className || ' ')
      + (this.showError() ? 'required' : '');
    const errorMessage = this.getErrorMessage();
    const labelClass = 'label '+ (this.showError() ? 'required' : '');
    return (
      <div className={className}>
        <label htmlFor={this.props.name}
               className={labelClass}> {this.props.title} </label>

        <select name={this.props.name}
                className='form-control small-select'
                onChange={this.props.onChange}
                value={this.getValue()}
                disabled={this.props.disabled}
                selected='selected'>

          <option value={DEFAULT_SELECT_VALUE}>{DEFAULT_SELECT_VALUE}</option>
          {this.props.options}
        </select>
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }

});

export default ValidatedSelect;
