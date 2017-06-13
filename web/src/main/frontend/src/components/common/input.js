import React from 'react';
import Formsy from 'formsy-react';

const MyInput = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  render() {

    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const className = 'form-group' + (this.props.className || ' ') +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
    const labelClass ='label '+(this.showRequired() ? 'required' : '');
    const inputClass = (this.showError() ? 'error' : '')+' form-control';
    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <label htmlFor={this.props.name} className={labelClass}>{this.props.title}</label>
        <input className={inputClass}
          type={this.props.type || 'text'}
          name={this.props.name}
               placeholder={this.props.placeholder}
               readOnly={this.props.readOnly}
               id={this.props.id}
          onChange={this.props.onChange}
          value={this.getValue()}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
        />
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

export default MyInput;
