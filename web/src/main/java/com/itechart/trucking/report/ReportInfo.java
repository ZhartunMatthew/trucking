package com.itechart.trucking.report;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReportInfo {

    private long carsAmount;
    private long employeesAmount;
    private long invoiceAmount;
    private long customersAmount;

    private long productsSum;
    private long productDelivered;
    private long productLost;
    private double productLostPercent;
    private double productLostPrice;

    private double avgDistance;
    private double totalDistance;
    private double fuelPrice;

    private double avgInvoiceRevenue;
    private double totalInvoiceRevenue;

    private double income;
    private double outcome;
    private double revenue;
}
