import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { setForeignActionDescription } from './modal.action'
let stompClient = null;
let subscription = null;

export function init(box) {
  stompClient = Stomp.over(new SockJS('/message-aggregator'));
  stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);
    if(box !== undefined) {
      console.log('/topic/common-box' + box);
      subscription = stompClient.subscribe('/topic/common-box' + box,
        function (message) {
          displayResponse(message);
        }
      );
    }
  });
}

export function terminate() {
  stompClient.disconnect();
}

export function unsubscribe() {
  if(subscription !== null) {
    console.log("Unsubscribed!");
    subscription.unsubscribe();
  }
}

export function send(url, message) {
  stompClient.send("/app/message-aggregator" + url, {},
    JSON.stringify({
      'subject' : message.subject,
      'content' : message.content
    }));
}

function displayResponse(message) {
  let data = JSON.parse(message.body);
  console.log("DATA: ", data);
  setForeignActionDescription({
    action: data.subject,
    description: data.content
  });
}
