import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomerTable from './customer-table';
import CustomerForm from './customer-form';

class CustomerComponent extends React.Component {

  render() {

    let content = this.props.currentCustomer ? (
        <div className='row'>
          <div className='col-sm-6'>
            <CustomerForm changes={this.props.changes} customer={this.props.currentCustomer}/>
          </div>
          <div className='col-sm-6'>
            <CustomerTable customers={this.props.customers}/>
          </div>
        </div>
      ) : (
        <div className='row'>
          <div className='col align-self-center'>
            <CustomerTable customers={this.props.customers}/>
          </div>
        </div>
      );
    return (
      <div className='container'>
        {content}
      </div>
    );
  }
}

let mapStateToProps = function (state) {
  return {
    customers: state.customers.customers,
    currentCustomer: state.operation.modifiedValue,
    changes: state.operation.changes
  };
};

export default connect(mapStateToProps, () => {})(CustomerComponent);