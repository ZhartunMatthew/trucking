package com.itechart.trucking.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.util.Date;

@Getter
@Setter
@ToString
public class CheckPointDTO extends AbstractDTO {
    private String description;
    private String latitude;
    private String longitude;
    private Date pathDate;
    private Long waybillId;
}
