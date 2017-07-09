package com.itechart.trucking.messaging.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class CustomMessage {
    private Long companyId;
    private String subject;
    private String content;
}
