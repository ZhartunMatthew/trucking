import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { setForeignActionDescription } from './modal.action'
let stompClient = null;
let subscription = null;
let company = null;
let isInited = false;

export function initialize(box, companyId) {
  console.log('Attempt to init socket...');
  if(isInited === false && companyId !== undefined) {
    isInited = true;
    init(box, companyId)
  } else {
    if(isInited === true) {
      console.log('Fail: socket already initialized!');
    }
    if(companyId === undefined) {
      console.log('Fail: undefined id!');
    }
  }
}

export function init(box, id) {
  stompClient = Stomp.over(new SockJS('/message-aggregator'));
  company = id;
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
  console.log("Terminating stomp...");
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
      'companyId' : message.companyId,
      'subject' : message.subject,
      'content' : message.content
    }));
}

function displayResponse(message) {
  let data = JSON.parse(message.body);
  console.log("INITIAL ID: ", company);
  console.log("MESSAGE ID: ", data.companyId);
  if(data.companyId === company) {
    console.log("DATA: ", data);
    setForeignActionDescription({
      action: data.subject,
      description: data.content
    });
  }
}
