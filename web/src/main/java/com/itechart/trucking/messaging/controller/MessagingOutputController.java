package com.itechart.trucking.messaging.controller;

import com.itechart.trucking.messaging.dto.InputMessage;
import com.itechart.trucking.messaging.dto.OutputMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class MessagingOutputController {

    @MessageMapping("/message-aggregator")
    @SendTo("/topic/common-box")
    public OutputMessage answer(@RequestBody InputMessage message) throws Exception {
        System.out.println("MESSAGE: " + message.getText());
        Thread.sleep(1000);
        OutputMessage outputMessage = new OutputMessage();
        outputMessage.setAnswer(message.getText() + "123" + message.getText());
        return outputMessage;
    }

}
