import React from 'react';

class CheckboxElement extends React.Component {
  render() {
    return (
      <div className='form-group'>
        <div>
          <input id={this.props.id}
                 type='checkbox'
                 checked={this.props.checked}
                 disabled={this.props.disabled}
                 className={this.props.className}
                 onChange={this.props.onChange}/>
        </div>
      </div>
    );
  }
}

CheckboxElement.propTypes = {
  id: React.PropTypes.string.isRequired,
  checked: React.PropTypes.any.isRequired,
  disabled: React.PropTypes.any,
  className: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
};

export default CheckboxElement;
