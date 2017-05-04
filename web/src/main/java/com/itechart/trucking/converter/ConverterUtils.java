package com.itechart.trucking.converter;

import org.springframework.core.convert.support.GenericConversionService;

public class ConverterUtils {
    private static GenericConversionService conversionService;

    static {
        conversionService = new GenericConversionService();
        conversionService.addConverter(new CarConverter());
    }

    public static GenericConversionService getConversionService() {
        return conversionService;
    }
}
