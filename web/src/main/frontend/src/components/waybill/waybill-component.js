import React from 'react';
import { connect } from 'react-redux';
import WaybillForm from './waybill-form';
import CheckPointComponent from '../checkPoint/checkPoint-component';

class WaybillComponent extends React.Component {

  render() {
    let content = (
      <div className='row'>
        <div className='col-sm-6'>
          <WaybillForm/>
        </div>
        <div className='col-sm-6'>
          <CheckPointComponent/>
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
    checkPoints: state.checkPoints.checkPoints
  };
};

export default connect(mapStateToProps, () => {})(WaybillComponent);


