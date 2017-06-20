import React from 'react';
import {connect} from 'react-redux';
import { setActionDescription } from '../actions/modal.action';
import ReactHighcharts from 'react-highcharts';
import ReactHighstock from 'react-highcharts';
import { sentenceCase } from 'change-case';

class ReportPage extends React.Component {

  constructor(props) {
    super(props);
    this.initCarHighchartsConfig = this.initCarHighchartsConfig.bind(this);
    this.initWaybillHighstockConfig = this.initWaybillHighstockConfig.bind(this);
    this.initProductHighchartsConfig = this.initProductHighchartsConfig.bind(this);
    this.state = {
      waybillHighstockConfig: {},
      carHighchartsConfig: {},
      productHighchartsConfig: {}
    };
    this.initCarHighchartsConfig();
    this.initWaybillHighstockConfig();
    this.initProductHighchartsConfig();
  }

  initWaybillHighstockConfig() {
    let data = [];
    for (let name in this.props.highcharts.revenueByDate) {
      data.push([
        Number(name), this.props.highcharts.revenueByDate[name]
      ]);
    }
    this.state.waybillHighstockConfig = {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'Revenue per date'
      },
      series: [{
        name: 'Revenue',
        data: data,
        tooltip: {
          valueDecimals: 2
        }
      }]
    };
  }

  initCarHighchartsConfig() {
    let series = [];
    for (let name in this.props.highcharts.revenueByCarType) {
      series.push({
        name: sentenceCase(name),
        data: [this.props.highcharts.revenueByCarType[name]]
      });
    }
    this.state.carHighchartsConfig = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Revenue by car type'
      },
      xAxis: {
        categories: ['Car type']
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
          }
        }
      },
      series: series
    };
  }

  initProductHighchartsConfig() {
    let data = [];
    for (let name in this.props.highcharts.lostProductsByState) {
      data.push([
        sentenceCase(name),
        this.props.highcharts.lostProductsByState[name]
      ]);
    }
    this.state.productHighchartsConfig = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Reasons of loss products'
      },
      plotOptions: {
        pie: {
          innerSize: 100,
          depth: 45
        }
      },
      series: [{
        name: 'Lost products price, $',
        data: data
      }]
    };
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
            <div className='row'>
              <div className='col-md-6'>
                <ReactHighcharts config={this.state.carHighchartsConfig}/>
              </div>
              <div className='col-md-6'>
                <ReactHighcharts config={this.state.productHighchartsConfig}/>
              </div>
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
