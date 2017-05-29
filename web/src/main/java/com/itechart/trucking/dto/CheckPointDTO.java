package com.itechart.trucking.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString(callSuper = true)
public class CheckPointDTO extends AbstractDTO {
    private String description;
    private String latitude;
    private String longitude;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date pathDate;
    private Long waybillId;
}
