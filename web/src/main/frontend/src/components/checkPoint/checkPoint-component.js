import React from 'react';
import {connect} from 'react-redux';
import CheckPointForm from '../checkPoint/checkPoint-form';
import CheckPointTable from '../checkPoint/checkPoint-table';

class CheckPointComponent extends React.Component {

  render() {
    let content =
      <div className='col'>
        <div className='col-sm-8'>
          <CheckPointTable/>
        </div>
        <div className='col-sm-8'>
          <CheckPointForm/>
        </div>
      </div>;
    return (
      <div> {content} </div>
    );
  }
}

let mapStateToProps = function (state) {
  return {}
};

export default connect(mapStateToProps, () => {})(CheckPointComponent);
