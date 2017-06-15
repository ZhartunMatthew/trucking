import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteTruckingCompany } from '../../actions/truckingCompany.action';
import { startOperation } from '../../actions/operation.action';

class TruckingCompanyTable extends React.Component {

  onShowUpdateGenreForm(truckingCompany) {
    this.props.startOperation(truckingCompany);
  }

  onShowCreateGenreForm() {
    this.props.startOperation({name: '', taxpayerNumber: '',country: '', city: '', street: '', house: ''});
  }

  deleteGenre(truckingCompany) {
    this.props.deleteTruckingCompany(truckingCompany);
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
          <td>
            <div className='btn-toolbar text-center'>
              <button className='btn btn-primary' onClick={this.onShowUpdateGenreForm.bind(this, truckingCompany)}>Update</button>
            </div>
          </td>
        </tr>
      )
    });
    return (
      <div>
        <h1>List of companies</h1>
        <table className='table table-striped table-hover'>
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
              <button className='btn btn-default' onClick={this.onShowCreateGenreForm.bind(this)}>Create New Trucking company
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

TruckingCompanyTable.propTypes = {
  truckingCompanies: React.PropTypes.array.isRequired,
  startOperation: React.PropTypes.func.isRequired,
  deleteTruckingCompany: React.PropTypes.func.isRequired
};


let mapStateToProps = function () {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch),
    deleteTruckingCompany: bindActionCreators(deleteTruckingCompany, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TruckingCompanyTable);
