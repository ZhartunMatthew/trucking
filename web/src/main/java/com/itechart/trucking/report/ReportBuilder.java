package com.itechart.trucking.report;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ReportBuilder {

    private ReportInfo reportInfo;
    private Workbook workbook;
    private Sheet sheet;
    private List<Cell> titles;

    public ReportBuilder(ReportInfo reportInfo) {
        this.reportInfo = reportInfo;
    }

    public void buildFinancialReport() throws IOException {
        workbook = new HSSFWorkbook();
        sheet = workbook.createSheet("Финансовый отчет");
        titles = new ArrayList<>();
        addResourceAmount();
        addProducts();
        addWaybills();
        addInvoices();
        addRevenue();
        setStyles();
        FileOutputStream fileOut = new FileOutputStream("report.xls");
        workbook.write(fileOut);
        fileOut.close();
    }

    private void addResourceAmount() {
        Cell resource = sheet.createRow(1).createCell(0);
        resource.setCellValue("Ресурсы компании");
        titles.add(resource);
        sheet.createRow(2).createCell(0).setCellValue("Количество автомобилей:");
        sheet.getRow(2).createCell(1).setCellValue(reportInfo.getCarsAmount());
        sheet.createRow(3).createCell(0).setCellValue("Количество  сотрудников:");
        sheet.getRow(3).createCell(1).setCellValue(reportInfo.getEmployeesAmount());
        sheet.createRow(4).createCell(0).setCellValue("Количество  клиентов:");
        sheet.getRow(4).createCell(1).setCellValue(reportInfo.getCustomersAmount());
    }

    private void addProducts() {
        Cell product = sheet.createRow(8).createCell(0);
        product.setCellValue("Продукты");
        titles.add(product);
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

    }

    private void addWaybills() {
        Cell waybill = sheet.getRow(8).createCell(3);
        waybill.setCellValue("Маршруты");
        titles.add(waybill);
        sheet.getRow(9).createCell(3).setCellValue("Средняя длина одного маршрута:");
        sheet.getRow(9).createCell(4).setCellValue(reportInfo.getAvgDistance());
        sheet.getRow(10).createCell(3).setCellValue("Общая длина всех маршрутов:");
        sheet.getRow(10).createCell(4).setCellValue(reportInfo.getTotalDistance());
        sheet.getRow(11).createCell(3).setCellValue("Суммарный расход на топливо:");
        sheet.getRow(11).createCell(4).setCellValue(reportInfo.getFuelPrice());
    }

    private void addInvoices() {
        Cell invoices = sheet.getRow(8).createCell(6);
        invoices.setCellValue("Перевозки");
        titles.add(invoices);
        sheet.getRow(9).createCell(6).setCellValue("Количество перевозок:");
        sheet.getRow(9).createCell(7).setCellValue(reportInfo.getInvoiceAmount());
        sheet.getRow(10).createCell(6).setCellValue("Средняя стоимость перевозки:");
        sheet.getRow(10).createCell(7).setCellValue(reportInfo.getAvgInvoiceRevenue());
        sheet.getRow(11).createCell(6).setCellValue("Суммарная стоимость перевозок:");
        sheet.getRow(11).createCell(7).setCellValue(reportInfo.getTotalInvoiceRevenue());

    }

    private void addRevenue() {
        sheet.createRow(18).createCell(0).setCellValue("Доходы = " + reportInfo.getIncome());
        sheet.createRow(19).createCell(0).setCellValue("Расходы = " + reportInfo.getOutcome());
        sheet.createRow(20).createCell(0).setCellValue("Прибыль = " + reportInfo.getRevenue());
    }

    private void setStyles() {
        CellStyle titleStyle = workbook.createCellStyle();
        titleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        Font font = workbook.createFont();
        font.setFontName("Arial");
        font.setBold(true);
        font.setColor(HSSFColor.INDIGO.index);
        font.setFontHeight((short) 240);
        titleStyle.setFillForegroundColor(HSSFColor.LIGHT_CORNFLOWER_BLUE.index);
        titleStyle.setFont(font);
        for (Cell cell: titles) {
            cell.setCellStyle(titleStyle);
        }

        CellStyle incomeStyle = workbook.createCellStyle();
        incomeStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        incomeStyle.setFillForegroundColor(HSSFColor.LIGHT_GREEN.index);
        sheet.getRow(11).getCell(6).setCellStyle(incomeStyle);
        sheet.getRow(11).getCell(7).setCellStyle(incomeStyle);

        CellStyle outcomeStyle = workbook.createCellStyle();
        outcomeStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        outcomeStyle.setFillForegroundColor(HSSFColor.ROSE.index);
        sheet.getRow(13).getCell(0).setCellStyle(outcomeStyle);
        sheet.getRow(13).getCell(1).setCellStyle(outcomeStyle);
        sheet.getRow(11).getCell(3).setCellStyle(outcomeStyle);
        sheet.getRow(11).getCell(4).setCellStyle(outcomeStyle);

        CellStyle revenueStyle = workbook.createCellStyle();
        revenueStyle.setFont(font);
        sheet.getRow(18).getCell(0).setCellStyle(revenueStyle);
        sheet.getRow(19).getCell(0).setCellStyle(revenueStyle);
        sheet.getRow(20).getCell(0).setCellStyle(revenueStyle);

        sheet.setColumnWidth(0, 10000);
        sheet.setColumnWidth(3, 10000);
        sheet.setColumnWidth(6, 10000);

    }
}
