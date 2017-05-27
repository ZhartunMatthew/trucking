import React from 'react';
import { connect } from 'react-redux';
import WaybillForm from './waybill-form';
import CheckPointTable from '../checkPoint/checkPoint-table';

class WaybillComponent extends React.Component {

  render() {
    let content = (
      <div className='row'>
        <div className='col-sm-6'>
          <WaybillForm changes={this.props.changes} waybill={null}/>
        </div>
        <div className='col-sm-6'>
          <CheckPointTable checkPoints={[]}/>
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
  };
};

export default connect(mapStateToProps, () => {})(WaybillComponent);


