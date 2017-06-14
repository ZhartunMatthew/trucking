package com.itechart.trucking.report;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class ReportBuilder {

    public static void buildFinancialReport() throws IOException {

        Workbook workbook = new HSSFWorkbook();
        FileOutputStream fileOut = new FileOutputStream("report.xls");

        // create excel xls sheet
        Sheet sheet = workbook.createSheet("Финансовый отчет");
        sheet.setDefaultColumnWidth(30);

        // create style for header cells
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setFontName("Arial");
        style.setFillForegroundColor(HSSFColor.LIGHT_TURQUOISE.index);
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        font.setBold(true);
        font.setColor(HSSFColor.INDIGO.index);
        style.setFont(font);

        // create header row
        Row title = sheet.createRow(0);
        title.createCell(0).setCellValue("Финансовый отчет");
        Row header = sheet.createRow(1);
        header.createCell(0).setCellValue("Бюджет");
        header.createCell(1).setCellValue("Доходы за год");
        header.createCell(2).setCellValue("Расходы за год");
        for (int i = 0; i <= 2; i++) {
            header.getCell(i).setCellStyle(style);
        }

        // create value row
        Row valueRow =  sheet.createRow(2);
        valueRow.createCell(0).setCellValue("15000$");
        valueRow.createCell(1).setCellValue("25000$");
        valueRow.createCell(2).setCellValue("5000$");

        workbook.write(fileOut);
        fileOut.close();
    }
}
