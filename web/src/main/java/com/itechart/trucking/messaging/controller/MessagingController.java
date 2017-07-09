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
    @SendTo(COMMON_BOX + "/dispatcher-box")
    public CustomMessage onCustomerCreate(@RequestBody CustomMessage inputMessage) throws Exception {
        LOGGER.info("MESSAGE FROM ADMIN: {}", inputMessage);
        CustomMessage outputMessage = new CustomMessage();
        outputMessage.setCompanyId(inputMessage.getCompanyId());
        outputMessage.setSubject("New customer!");
        outputMessage.setContent("Customer " + inputMessage.getContent() + " have been added");
        return outputMessage;
    }

    @MessageMapping("/new-invoice")
    @SendTo(COMMON_BOX + "/manager-box")
    public CustomMessage onInvoiceCreate() {

        return null;
    }

    @MessageMapping("/new-waybill")
    @SendTo(COMMON_BOX + "/driver-box")
    public CustomMessage onWaybillCreate() {

        return null;
    }
}
