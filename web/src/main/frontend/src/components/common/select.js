import React from 'react';

class SelectComponent extends React.Component {
  render() {
    return (
      <div className='form-group'>
        <label className='control-label' htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <select id={this.props.id} className='form-control small-select' value={this.props.value} onChange={this.props.onChange} disabled={this.props.disabled}>
          {this.props.options}
        </select>
      </div>
    );
  }
}

SelectComponent.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.any.isRequired,
  onChange: React.PropTypes.func.isRequired,
  options: React.PropTypes.array.isRequired,
  value: React.PropTypes.any.isRequired,
  disabled: React.PropTypes.bool.isRequired
};

export default SelectComponent;

