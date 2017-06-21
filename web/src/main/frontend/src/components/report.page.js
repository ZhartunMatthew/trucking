import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActionDescription } from '../actions/modal.action';
import ReactHighcharts from 'react-highcharts';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import { sentenceCase } from 'change-case';
import Highcharts from 'highcharts';
import { loadHighcharts } from '../actions/highcharts.action';

class ReportPage extends React.Component {

  constructor(props) {
    super(props);
    this.initCarHighchartsConfig = this.initCarHighchartsConfig.bind(this);
    this.initWaybillHighstockConfig = this.initWaybillHighstockConfig.bind(this);
    this.initProductHighchartsConfig = this.initProductHighchartsConfig.bind(this);
    this.state = {
      waybillHighstockConfig: this.initWaybillHighstockConfig(this.props),
      carHighchartsConfig: this.initCarHighchartsConfig(this.props),
      productHighchartsConfig: this.initProductHighchartsConfig(this.props)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      waybillHighstockConfig: this.initWaybillHighstockConfig(nextProps),
      carHighchartsConfig: this.initCarHighchartsConfig(nextProps),
      productHighchartsConfig: this.initProductHighchartsConfig(nextProps)
    });
  }

  initWaybillHighstockConfig(props) {
    let data = [];
    if(!props.highcharts.revenueByDate) {
      props.highcharts.revenueByDate = {};
    }
    let keys = Object.keys(props.highcharts.revenueByDate).sort();
    for (let i = 0; i < keys.length; i++) {
      let day = 24 * 60 * 60 * 1000;
      let date = Number(keys[i]) + day;
      data.push([
        date,
        props.highcharts.revenueByDate[keys[i]]
      ]);
    }
    return {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'Revenue per date'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>${point.y:.2f}</b>',
        xDateFormat: '%A, %b %e, %Y'
      },
      series: [{
        name: 'Revenue',
        data: data
      }]
    };
  }

  initCarHighchartsConfig(props) {
    let series = [];
    for (let name in props.highcharts.revenueByCarType) {
      series.push({
        name: sentenceCase(name),
        data: [props.highcharts.revenueByCarType[name]]
      });
    }
    return {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Revenue by car type'
      },
      xAxis: {
        categories: ['Car type']
      },
      yAxis: {
        lineWidth: 1,
        tickWidth: 1,
        title: {
          align: 'high',
          offset: 0,
          text: 'Revenue, $',
          rotation: 0,
          y: -10
        }
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>${point.y:.2f}</b>',
      },
      plotOptions: {
        column: {
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>${y:.2f}',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: series
    };
  }

  initProductHighchartsConfig(props) {
    let data = [];
    for (let name in props.highcharts.lostProductsByState) {
      data.push([
        sentenceCase(name),
        props.highcharts.lostProductsByState[name]
      ]);
    }
    return {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Reasons of loss products'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>${point.y:.2f}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.2f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          },
          innerSize: 100,
          depth: 45
        }
      },
      series: [{
        name: 'Lost products price',
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
            <div className="text-center mb-5">
              <h4>Hello, {this.props.currentUser.name} {this.props.currentUser.surname}!</h4>
              <h4>Your company {this.props.currentUser.truckingCompanyName}</h4>
            </div>
            <div className="mb-3">
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
            <div className="row mt-3">
              <div className="col-sm-6">
                <table className='table table-hover table-striped'>
                  <tbody>
                  <tr>
                    <td>Cars</td>
                    <td>{this.props.cars.length}</td>
                  </tr>
                  <tr>
                    <td>Employees</td>
                    <td>{this.props.users.length -  1}</td>
                  </tr>
                  <tr>
                    <td>Customers</td>
                    <td>{this.props.customers.length}</td>
                  </tr>
                  <tr>
                    <td>Deliveries</td>
                    <td>{this.props.invoices.length}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-sm-5">
                <div>
                  <div className="mb-2">
                    You can download your profits and losses report here.
                  </div>
                  <button onClick={this.download}
                          className='btn btn-success'
                          data-animation="false"> Download report </button>
                </div>
              </div>
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

function mapDispatchToProps(dispatch) {
  return {
    loadHighcharts: bindActionCreators(loadHighcharts, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage);
