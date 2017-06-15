package com.itechart.trucking.report;

import com.itechart.trucking.security.detail.CustomUserDetailsProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

@Controller
@RequestMapping(value = "/api/report")
public class ReportController {

    @Autowired
    CalculatingService calculatingService;

    private static final Logger LOGGER = LoggerFactory.getLogger(ReportController.class);

    @RequestMapping(value = "", method = RequestMethod.GET)
    public void download(HttpServletResponse response) throws IOException {
        LOGGER.info("Path:/report/download  method: GET");
        Long truckingCompanyId = CustomUserDetailsProvider.getUserDetails().getTruckingCompanyId();
        ReportInfo reportInfo = calculatingService.calculate(truckingCompanyId);
        ReportBuilder reportBuilder = new ReportBuilder(reportInfo);
        reportBuilder.buildFinancialReport();
        response.setHeader("Content-Disposition", "attachment; filename=\"report.xls\"");
        File xls = new File("report.xls");
        FileInputStream in = new FileInputStream(xls);
        OutputStream out = response.getOutputStream();

        byte[] buffer= new byte[8192];
        int length = 0;

        while ((length = in.read(buffer)) > 0){
            out.write(buffer, 0, length);
        }
        in.close();
        out.close();
        if(!xls.delete()){
            LOGGER.warn("Delete operation is failed.");
        }
    }
}
