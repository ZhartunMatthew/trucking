import React from 'react';
import {connect} from 'react-redux';
import { setActionDescription } from '../actions/modal.action';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';

class ReportPage extends React.Component {

  constructor(props) {
    super(props);
    let waybillHighstockData = [];
    for (let name in this.props.highcharts.revenueByDate) {
      waybillHighstockData.push([
        Number(name), this.props.highcharts.revenueByDate[name]
      ]);
    }
    let waybillHighstockConfig = {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'Revenue per date'
      },
      series: [{
        name: 'Revenue = ',
        data: waybillHighstockData,
        tooltip: {
          valueDecimals: 2
        }
      }]
    };
    this.state = {
      waybillHighstockConfig: waybillHighstockConfig
    }
  }

  download() {
    setActionDescription({
      action: 'Downloading started',
      description: ''
    });
    setTimeout(() => {
      const response = {
        file: 'api/report',
      };
      window.location.href = response.file;
    }, 100);
  }

  render() {
    return(
      <div className='container'>
        <div className='row'>
          <div className='col align-self-center'>
            <div className="text-center">
              <h4>Hello {this.props.currentUser.name} {this.props.currentUser.surname}!</h4>
              <h4>Your company {this.props.currentUser.truckingCompanyName}</h4>
            </div>
            <table className='table table-bordered'>
              <tr>
                <td>Cars</td>
                <td>{this.props.cars.length}</td>
              </tr>
              <tr>
                <td>Employees</td>
                <td>{this.props.users.length-1}</td>
              </tr>
              <tr>
                <td>Customers</td>
                <td>{this.props.customers.length}</td>
              </tr>
              <tr>
                <td>Deliveries</td>
                <td>{this.props.invoices.length}</td>
              </tr>
            </table>
            <div>
              <ReactHighstock config={this.state.waybillHighstockConfig}/>
            </div>
            <div>
              <div>
                You can download your profits and losses report here.
              </div>
              <button onClick={this.download}
                      className='btn btn-success'
                      data-animation="false"> Download report </button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.currentUser,
    cars: state.cars.cars,
    customers: state.customers.customers,
    users: state.users.users,
    invoices: state.invoices.invoices,
    highcharts: state.highcharts.highcharts
  }
}

export default connect(mapStateToProps, ()=>{})(ReportPage);
