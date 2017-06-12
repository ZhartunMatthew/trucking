import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomerTable from './customer-table';
import CustomerForm from './customer-form';
import { cancelOperation } from '../../actions/operation.action';

class CustomerComponent extends React.Component {

  componentDidMount() {
    this.props.cancelCurrentOperation();
  }

  render() {
    if(this.props.currentCustomer !== null && this.props.currentCustomer !== undefined) {
      if(this.props.currentCustomer.hasOwnProperty('checkDate')) {
        this.props.currentCustomer = null;
      }
    }

    let content = this.props.currentCustomer ? (
        <div className='row'>
          <div className='col-sm-6'>
            <CustomerForm changes={this.props.changes} customer={this.props.currentCustomer}/>
          </div>
          <div className='col-sm-5'>
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

function mapDispatchToProps(dispatch) {
  return {
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerComponent);
