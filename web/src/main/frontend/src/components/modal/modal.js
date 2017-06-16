import React from 'react';
import {connect} from 'react-redux';

class ModalComponent extends React.Component {

  render() {
    return (
      <div id="modal-action" className="modal" role="dialog">
        <div className="modal-dialog modal-action-dialog">
          <div className="panel panel-info modal-action-content">
            <div className="panel-heading">
              <h4 id="modal-action-text" className="text-center"> </h4>
            </div>
            <div className="panel-body">
              <div id="modal-description-text" className='text-center'>
                <div className="close"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = function (state) {};

let mapDispatchToProps = function (dispatch) {};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
