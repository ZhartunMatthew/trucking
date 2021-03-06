import React from 'react';
import Formsy from 'formsy-react';

const ValidatedInput = React.createClass({

  mixins: [Formsy.Mixin],

  render() {
    const className = 'form-group' + (this.props.className || ' ')
      + (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
    const labelClass = 'label '+ (this.showRequired() ? 'required' : '');
    const inputClass = (this.showError() ? 'error' : '') + ' form-control';
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
               checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}/>

        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

export default ValidatedInput;
