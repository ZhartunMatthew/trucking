package com.itechart.trucking.report;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class ReportBuilder {

    public static void buildFinancialReport(ReportInfo reportInfo) throws IOException {

        Workbook workbook = new HSSFWorkbook();
        FileOutputStream fileOut = new FileOutputStream("report.xls");

        // create excel xls sheet
        Sheet sheet = workbook.createSheet("Финансовый отчет");
//        sheet.setDefaultColumnWidth(30);
        sheet.setColumnWidth(0, 10000);

        // create style for header cells
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setFontName("Arial");
        font.setFontHeight((short) 240);
        style.setFillForegroundColor(HSSFColor.LIGHT_CORNFLOWER_BLUE.index);
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        font.setBold(true);
        font.setColor(HSSFColor.INDIGO.index);
        style.setFont(font);

        // create header row
        Cell resource = sheet.createRow(1).createCell(0);
        resource.setCellValue("Ресурсы компании");
        resource.setCellStyle(style);

        sheet.createRow(2).createCell(0).setCellValue("Количество автомобилей:");
        sheet.getRow(2).createCell(1).setCellValue(reportInfo.getCarsAmount());
        sheet.createRow(3).createCell(0).setCellValue("Количество  сотрудников:");
        sheet.getRow(3).createCell(1).setCellValue(reportInfo.getEmployeesAmount());
        sheet.createRow(4).createCell(0).setCellValue("Количество  клиентов:");
        sheet.getRow(4).createCell(1).setCellValue(reportInfo.getCustomersAmount());

        sheet.createRow(8).createCell(0).setCellValue("Продукты");
        sheet.createRow(9).createCell(0).setCellValue("Суммарное количество в перевозках");
        sheet.getRow(9).createCell(1).setCellValue(reportInfo.getProductsSum());
        sheet.createRow(10).createCell(0).setCellValue("из них доставлено:");
        sheet.getRow(10).createCell(1).setCellValue(reportInfo.getProductDelivered());
        sheet.createRow(11).createCell(0).setCellValue("из них утеряно:");
        sheet.getRow(11).createCell(1).setCellValue(reportInfo.getProductLost());
        sheet.createRow(12).createCell(0).setCellValue("процент утерянных:");
        sheet.getRow(12).createCell(1).setCellValue(reportInfo.getProductLostPercent());
        sheet.createRow(13).createCell(0).setCellValue("Стоимость утерянных продуктов:");
        sheet.getRow(13).createCell(1).setCellValue(reportInfo.getProductLostPrice());

        sheet.getRow(8).createCell(3).setCellValue("Маршруты");
        sheet.getRow(9).createCell(3).setCellValue("Средняя длина одного маршрута:");
        sheet.getRow(9).createCell(4).setCellValue(reportInfo.getAvgDistance());
        sheet.getRow(10).createCell(3).setCellValue("Общая длина всех маршрутов:");
        sheet.getRow(10).createCell(4).setCellValue(reportInfo.getTotalDistance());
        sheet.getRow(11).createCell(3).setCellValue("Суммарный расход на топливо:");
        sheet.getRow(11).createCell(4).setCellValue(reportInfo.getFuelPrice());

        sheet.getRow(8).createCell(6).setCellValue("Перевозки");
        sheet.getRow(9).createCell(6).setCellValue("Количество перевозок:");
        sheet.getRow(9).createCell(7).setCellValue(reportInfo.getInvoiceAmount());
        sheet.getRow(10).createCell(6).setCellValue("Средняя стоимость перевозки:");
        sheet.getRow(10).createCell(7).setCellValue(reportInfo.getAvgInvoiceRevenue());
        sheet.getRow(11).createCell(6).setCellValue("Суммарная стоимость перевозок:");
        sheet.getRow(11).createCell(7).setCellValue(reportInfo.getTotalInvoiceRevenue());

        sheet.createRow(18).createCell(0).setCellValue("Доходы = " + reportInfo.getIncome());
        sheet.createRow(19).createCell(0).setCellValue("Расходы = " + reportInfo.getOutcome());
        sheet.createRow(20).createCell(0).setCellValue("Прибыль = " + reportInfo.getRevenue());
        workbook.write(fileOut);
        fileOut.close();
    }
}
