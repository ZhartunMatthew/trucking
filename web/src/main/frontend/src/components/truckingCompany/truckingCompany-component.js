import React from 'react';
import { connect } from 'react-redux';
import TruckingCompanyForm from './truckingCompany-form';
import TruckingCompanyTable from './truckingCompany-table';

class TruckingCompanyComponent extends React.Component {

  render() {
    let content = this.props.currentTruckingCompany ? (
      <div className='row'>
        <div className='col-sm-4'>
          <TruckingCompanyForm changes={this.props.changes} truckingCompany={this.props.currentTruckingCompany}/>
        </div>
        <div className='col-sm-8'>
          <TruckingCompanyTable truckingCompanies={this.props.truckingCompanies}/>
        </div>
      </div>
    ) : (
      <div className='container col-sm-12'>
        <div className='col align-self-center'>
          <TruckingCompanyTable truckingCompanies={this.props.truckingCompanies}/>
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
    truckingCompanies: state.truckingCompanies.truckingCompanies,
    currentTruckingCompany: state.operation.modifiedValue,
    changes: state.operation.changes
  };
};

export default connect(mapStateToProps, () => {})(TruckingCompanyComponent);
