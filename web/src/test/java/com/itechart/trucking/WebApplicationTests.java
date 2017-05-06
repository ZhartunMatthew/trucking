package com.itechart.trucking;

import com.itechart.trucking.dto.WaybillDTO;
import com.itechart.trucking.services.WaybillService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.convert.ConversionService;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WebApplicationTests {

	@Autowired
	private WaybillService waybillService;

	@Autowired
	private ConversionService conversionService;

	@Test
	public void contextLoads() {
		System.out.println(conversionService.convert(waybillService.findOne(1L), WaybillDTO.class));
	}

}
