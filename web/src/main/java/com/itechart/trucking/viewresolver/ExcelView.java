/*
package com.itechart.trucking.viewresolver;

import com.itechart.trucking.entity.User;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.springframework.web.servlet.view.document.AbstractXlsView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

public class ExcelView extends AbstractXlsView {

    @Override
    protected void buildExcelDocument(Map<String, Object> model,
                                      Workbook workbook,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {

        // change the file name
        response.setHeader("Content-Disposition", "attachment; filename=\"report.xls\"");

        @SuppressWarnings("unchecked")
        List<User> users = (List<User>) model.get("users"); //TODO replace usersDTO

        // create excel xls sheet
        Sheet sheet = workbook.createSheet("Пользователи");
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
        title.createCell(0).setCellValue("Cписок пользователей");
        Row header = sheet.createRow(1);
        header.createCell(0).setCellValue("Имя");
        header.createCell(1).setCellValue("Фамилия");
        header.createCell(2).setCellValue("Логин");
        for (int i = 0; i <= 2; i++) {
            header.getCell(i).setCellStyle(style);
        }

        int rowCount = 2;
        for(User user : users){
            Row userRow =  sheet.createRow(rowCount++);
            userRow.createCell(0).setCellValue(user.getName());
            userRow.createCell(1).setCellValue(user.getSurname());
            userRow.createCell(2).setCellValue(user.getLogin());
            }
    }
}
*/
