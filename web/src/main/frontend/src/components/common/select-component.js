import React from 'react';
import Formsy from 'formsy-react';

const MySelect = React.createClass({

  mixins: [Formsy.Mixin],

  changeValue(event) {
    this.setValue(event.currentTarget.value);
  },

  render() {
    const className = 'form-group' + (this.props.className || ' ') +
      (this.showError() ? 'required' : '');
    const errorMessage = this.getErrorMessage();

    const options = this.props.options.map((option, i) => (
      <option key={option.title+option.value} value={option.value}>
        {option.title}
      </option>
    ));
    console.log(this.showError());
    const labelClass ='label '+(this.showError() ? 'required' : '');
    return (
      <div className={className}>
        <label htmlFor={this.props.name} className={labelClass}>{this.props.title}</label>
        <select name={this.props.name} className='form-control small-select' onChange={this.props.onChange}
                value={this.getValue()} disabled={this.props.disabled}>
          {this.props.options}
        </select>
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }

});

export default MySelect;
