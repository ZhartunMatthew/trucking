import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
let stompClient = null;

export function init(box) {
  stompClient = Stomp.over(new SockJS('/message-aggregator'));
  stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/common-box/' + box,
      function(message) {
        displayResponse(message);
      });
  });
}

export function terminate() {
  stompClient.disconnect();
}

export function sendData(url, message) {
  stompClient.send("/app/message-aggregator" + url, {},
    JSON.stringify({
      'subject' : message.subject,
      'content' : message.content
    }));
}

function displayResponse(message) {
  let data = JSON.parse(message.body);
  console.log("DATA", data);
}
