import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCustomerCompany } from '../../actions/customer.action';
import { startOperation } from '../../actions/operation.action';

class CustomerTable extends React.Component {

  onShowUpdateCustomerForm(customerCompany) {
    this.props.startOperation(customerCompany);
  }

  onShowCreateCustomerForm() {
    this.props.startOperation({number: '', taxpayerNumber: '',country: '', city: '', street: '', house: ''});
  }

  deleteCustomer(customerCompany) {
    this.props.deleteCustomer(customerCompany);
  }

  render() {
    let rows = this.props.customers.map((customer, index) => {
      return (
        <tr key={customer.id}>
          <th scope='row'> {index + 1} </th>
          <td> {customer.number}</td>
          <td> {customer.taxpayerNumber}</td>
          <td> {customer.country}</td>
          <td> {customer.city}</td>
          <td> {customer.street}</td>
          <td> {customer.house}</td>
          <td>
            <div className='btn-toolbar text-center'>
              <button className='btn btn-primary' onClick={this.onShowUpdateCustomerForm.bind(this, customer)}>Update</button>
              <button className='btn btn-danger' onClick={this.deleteCustomer.bind(this, customer)}>Delete</button>
            </div>
          </td>
        </tr>
      )
    });
    return (
      <div>
        <h1>List of companies</h1>
        <table className='table table-hover'>
          <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>taxpayer number</th>
            <th>country</th>
            <th>city</th>
            <th>street</th>
            <th>house</th>
            <th>actions</th>
          </tr>
          </thead>
          <tbody>
          {rows}
          <tr>
            <td colSpan={3}>
              <button className='btn btn-default' onClick={this.onShowCreateCustomerForm.bind(this)}>Create new company
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

CustomerTable.propTypes = {
  customers: React.PropTypes.array.isRequired,
  startOperation: React.PropTypes.func.isRequired,
  deleteCustomer: React.PropTypes.func.isRequired
};


let mapStateToProps = function () {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch),
    deleteCustomer: bindActionCreators(deleteCustomerCompany, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTable);

