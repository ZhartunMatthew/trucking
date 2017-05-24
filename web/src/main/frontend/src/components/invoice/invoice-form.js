import React from 'react';
import Input from '../common/text-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateInvoice } from '../../actions/invoice.action';
import { updateOperation, cancelOperation } from '../../actions/operation.action';

class InvoiceForm extends React.Component {

  handleNumberChange(event) {
    this.props.updateOperation('number', event.target.value);
  }

  handleRegisterDate(event) {
    this.props.updateOperation('register-date', event.target.value);
  }

  handleCustomerCompany(event) {
    this.props.updateOperation('customer-company', event.target.value);
  }


  save() {
    this.props.updateInvoice(this.props.invoice);
  }

  cancel() {
    this.props.cancelOperation();
  }

  render() {
    let editingLabel = <span> Check invoice №<b>{this.props.invoice.number}</b> </span>;
    const disabledClass = this.props.changes ? '' : 'disabled';
    return (
      <div>
        <form className='form-horizontal'>
          <fieldset>
            <legend>{editingLabel} </legend>
            <Input id='number' type='text' label='Invoice number' placeholder='' value={this.props.invoice.number || ''}
                   onChange={this.handleNumberChange.bind(this)} readOnly={true}/>
            <Input id='register-date' type='text' label='Register date' placeholder=''
                   value={this.props.invoice.registerDate || ''} onChange={this.handleRegisterDate.bind(this)}
                   readOnly={true}/>
            <Input id='customer-company' type='text' label='Customer company' placeholder=''
                   value={this.props.invoice.customerCompany || ''} onChange={this.handleCustomerCompany.bind(this)}
                   readOnly={true}/>
            <div className='btn-toolbar text-center'>
              <div className='btn-group' role='group'>
                <button type='button' className='btn btn-success' onClick={this.cancel.bind(this)}>Close</button>
              </div>
              <div className='btn-group float-right' role='group'>
                <button type='button' className={`${disabledClass} btn btn-primary`}
                        onClick={this.props.changes ? this.save.bind(this) : null}>Save
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

InvoiceForm.propTypes = {
  invoice: React.PropTypes.object.isRequired,
  changes: React.PropTypes.bool,
  updateInvoice: React.PropTypes.func.isRequired,
  updateOperation: React.PropTypes.func.isRequired,
  cancelOperation: React.PropTypes.func.isRequired
};

let mapStateToProps = function () {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    updateInvoice: bindActionCreators(updateInvoice, dispatch),
    updateOperation: bindActionCreators(updateOperation, dispatch),
    cancelOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);
