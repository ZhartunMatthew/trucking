package com.itechart.trucking.messaging.controller;

import com.itechart.trucking.messaging.dto.CustomMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@MessageMapping("/message-aggregator")
public class MessagingController {

    private final static Logger LOGGER = LoggerFactory.getLogger(MessagingController.class);
    private final static String COMMON_BOX = "/topic/common-box";

    @MessageMapping("/new-customer")
    @SendTo({COMMON_BOX + "/dispatcher-box", COMMON_BOX + "/owner-box"})
    public CustomMessage onCustomerCreate(@RequestBody CustomMessage inputMessage) throws Exception {
        LOGGER.info("MESSAGE FROM ADMIN: {}", inputMessage);
        return inputMessage;
    }

    @MessageMapping("/new-invoice")
    @SendTo({COMMON_BOX + "/manager-box", COMMON_BOX + "/owner-box"})
    public CustomMessage onInvoiceCreate(@RequestBody CustomMessage inputMessage) {
        LOGGER.info("MESSAGE FROM DISPATCHER: {}", inputMessage);
        return inputMessage;
    }

    @MessageMapping("/new-waybill")
    @SendTo({COMMON_BOX + "/driver-box", COMMON_BOX + "/owner-box"})
    public CustomMessage onWaybillCreate(@RequestBody CustomMessage inputMessage) {
        LOGGER.info("MESSAGE FROM MANAGER: {}", inputMessage);
        return inputMessage;
    }
}
