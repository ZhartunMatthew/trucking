import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startOperation } from '../../actions/operation.action';

class TruckingCompanyTable extends React.Component {

  onShowUpdateTruckingCompanyForm(truckingCompany) {
    this.props.startOperation(truckingCompany);
  }

  onShowCreateTruckingCompanyForm() {
    this.props.startOperation({
      name: '',
      taxpayerNumber: '',
      country: '',
      city: '',
      street: '',
      house: ''
    });
  }

  render() {
    let rows = this.props.truckingCompanies.map((truckingCompany, index) => {
      return (
        <tr key={truckingCompany.id}>
          <th scope='row'> {index + 1} </th>
          <td> {truckingCompany.name}</td>
          <td> {truckingCompany.taxpayerNumber}</td>
          <td> {truckingCompany.country}</td>
          <td> {truckingCompany.city}</td>
          <td> {truckingCompany.street}</td>
          <td> {truckingCompany.house}</td>
          <td style={{paddingRight: '0px'}}>
            <button className='btn btn-primary'
                    onClick={this.onShowUpdateTruckingCompanyForm.bind(this, truckingCompany)}>Update</button>
          </td>
        </tr>
      )
    });
    return (
      <div>
        <h3>List of companies</h3>
        <table className='table table-hover'>
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Taxpayer number</th>
            <th>Country</th>
            <th>City</th>
            <th>Street</th>
            <th>House</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <button className='btn btn-default' onClick={this.onShowCreateTruckingCompanyForm.bind(this)}>Create</button>
      </div>
    );
  }
}

TruckingCompanyTable.propTypes = {
  truckingCompanies: React.PropTypes.array.isRequired,
  startOperation: React.PropTypes.func.isRequired,
  deleteTruckingCompany: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch)
  }
}

export default connect(() => {}, mapDispatchToProps)(TruckingCompanyTable);
