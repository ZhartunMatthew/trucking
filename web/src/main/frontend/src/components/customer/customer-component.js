import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomerTable from './customer-table';
import CustomerForm from './customer-form';
import { cancelOperation } from '../../actions/operation.action';
import { Role } from '../../constants/roles';
import { loadCustomers } from '../../actions/customer.action';
import { POOLING_TIMEOUT } from '../../constants/constants'

class CustomerComponent extends React.Component {

  componentWillUnmount() {
    if(this.props.userRole === Role.COMPANY_OWNER || this.props.userRole === Role.ADMIN) {
      this.props.cancelCurrentOperation();
    }
  }

  componentDidMount() {
    if(this.props.userRole === Role.DISPATCHER) {
      setInterval(function (self) {
        console.log("Customer list were updated!");
        self.props.loadCustomers();
      }, POOLING_TIMEOUT, this);
    }
  }

  render() {
    if(this.props.currentCustomer !== null && this.props.currentCustomer !== undefined) {
      if(this.props.currentCustomer.hasOwnProperty('checkDate')) {
        this.props.currentCustomer = null;
      }
    }

    let content = this.props.currentCustomer ? (
        <div className='row'>
          <div className='col-sm-4'>
            <CustomerForm changes={this.props.changes} customer={this.props.currentCustomer}/>
          </div>
          <div className='col-sm-8'>
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
    changes: state.operation.changes,
    userRole: state.userRole.userRole
  };
};

function mapDispatchToProps(dispatch) {
  return {
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch),
    loadCustomers: bindActionCreators(loadCustomers, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerComponent);
