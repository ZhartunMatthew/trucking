import React from 'react';

let DEFAULT_AMOUNT_OF_ROWS = 10;
let MIN_AMOUNT_OF_ROWS = 5;

class TextareaElement extends React.Component {

  render() {
    let value = this.props.value ? this.props.value : '';
    let amountOfLines = value.split(/\r\n|\r|\n/).length;
    amountOfLines = amountOfLines > DEFAULT_AMOUNT_OF_ROWS ? DEFAULT_AMOUNT_OF_ROWS : amountOfLines;
    amountOfLines = amountOfLines < MIN_AMOUNT_OF_ROWS ? MIN_AMOUNT_OF_ROWS : amountOfLines;
    return (
      <div className='form-group'>
        <label className='label'>
          {this.props.label}
        </label>
        <textarea id={this.props.id}
                  className='form-control'
                  maxLength={this.props.maxLength}
                  value={value}
                  readOnly={this.props.readOnly}
                  rows={this.props.rows}
                  placeholder={this.props.placeholder}
                  onChange={this.props.onChange}/>
      </div>
    );
  }
}

TextareaElement.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.any.isRequired,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  maxLength: React.PropTypes.number,
  rows: React.PropTypes.number,
  readOnly: React.PropTypes.bool
};

TextareaElement.defaultProps = {
  placeholder: ''
};

export default TextareaElement;

