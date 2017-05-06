package com.itechart.trucking.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(callSuper = true)
public class AbstractStateDTO extends AbstractDTO {
    protected String name;
}
