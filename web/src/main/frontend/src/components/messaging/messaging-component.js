import React from 'react';
import { connect } from 'react-redux';
import {
  init, terminate, sendData
} from '../../actions/messaging.action';

class MessagingComponent extends React.Component {

  componentDidMount() {
    init('/dispatcher-box');
  }

  send() {
    sendData('/new-customer', {
      subject: "New message",
      content: this.message.value
    });
  }

  disconnect() {
    terminate();
  }

  render() {
    return (
      <div className="container">
        <div className="row  align-content-center">
          <div className="col-8">
            MESSAGES EEEEEE
            <input type='text'
                   className='form-control'
                   placeholder='Type your message'
                   ref={(input) => this.message = input}
                   autoFocus/>
            <br/>
            <button className="btn btn-success" onClick={this.send.bind(this)}> Send message </button>
            <button className="btn btn-danger" onClick={this.disconnect.bind(this)}> Disconnect </button>
            <div id="answer">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => {}, () => {})(MessagingComponent);

