import React from 'react';
import { connect } from 'react-redux';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class MessagingComponent extends React.Component {

  componentDidMount() {
    let socket = new SockJS('/message-aggregator');
    this.stompClient = Stomp.over(socket);
    let self = this;
    this.stompClient.connect({}, function(frame) {
      console.log('Connected: ' + frame);
      self.stompClient.subscribe('/topic/common-box', function(message) {
        self.showAnswer(message);
      });
    });
  }

  sendData() {
    let message = this.message.value;
    this.stompClient.send("/app/message-aggregator", {},
      JSON.stringify({
          'text' : message
      }));
  }

  showAnswer(message) {
    let data = JSON.parse(message.body);
    console.log("DATA", data);
    $('#answer').text(data.answer)
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
            <button className="btn btn-success" onClick={this.sendData.bind(this)}> Send message </button>
            <div id="answer">

            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = function (state) {
};

let mapDispatchToProps = function(dispatch) {
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagingComponent);

