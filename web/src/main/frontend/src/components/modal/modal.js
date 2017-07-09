import React from 'react';

class ModalComponent extends React.Component {

  render() {
    return (
      <div>
        <div id='modal-action' className='modal-action-dialog'>
          <div id='modal-content' className='panel panel-info modal-action-content'>
            <div className='panel-heading'>
              <h4 id='modal-action-text' className='text-center'> </h4>
            </div>
            <div className='panel-body'>
              <div id='modal-description-text' className='text-center'>
              </div>
            </div>
          </div>
        </div>
        <div id='foreign-modal-action' className='foreign-modal-action-dialog'>
          <div id='foreign-modal-content' className='panel panel-info foreign-modal-action-content'>
            <div className='panel-heading'>
              <h4 id='foreign-modal-action-text' className='text-center'> </h4>
            </div>
            <div className='panel-body'>
              <div id='foreign-modal-description-text' className='text-center'>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalComponent;
