package com.itechart.trucking.security.providers;

import com.itechart.trucking.entity.Invoice;
import com.itechart.trucking.entity.Product;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetails;
import com.itechart.trucking.services.InvoiceService;
import com.itechart.trucking.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductProvider implements AbstractDataProvider {

    @Autowired
    private ProductService productService;

    @Autowired
    private InvoiceService invoiceService;

    @Override
    public boolean provideGET(CustomUserDetails details, Long productId) {
        UserRoleEnum role = details.getRole();
        //админ и сисадмин не имеют права
        if(role != UserRoleEnum.SYSTEM_ADMIN && role != UserRoleEnum.ADMIN) {
            if(productId == null) {
                return true;
            }
            //проверяем, что инвойс этих продуктов принадлежит твоей транспортной компании
            Product product = productService.securedFindOne(productId);
            Invoice invoice = invoiceService.securedFindOne(product.getInvoice().getId());
            if(invoice.getTruckingCompany().getId().equals(details.getTruckingCompanyId())) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    @Override
    public boolean providePOST(CustomUserDetails details, Long productId) {
        UserRoleEnum role = details.getRole();
        if(role == UserRoleEnum.DISPATCHER) { //создает только диспетчер
            return true;
        }
        return false;
    }

    @Override
    public boolean providePUT(CustomUserDetails details, Long productId) {
        if(productId == null) {
            return false;
        }
        //одновляют только дипетчет, менеджер и водитель
        UserRoleEnum role = details.getRole();
        if(role == UserRoleEnum.DISPATCHER || role == UserRoleEnum.MANAGER || role == UserRoleEnum.DRIVER) {
            return true;
        }
        return false;
    }

    @Override
    public boolean provideDELETE(CustomUserDetails details, Long productId) {
        UserRoleEnum role = details.getRole();
        if(role == UserRoleEnum.DISPATCHER) { //удляет только диспеьчер
            return true;
        }
        return false;
    }

    public boolean provideGETbyInvoice(CustomUserDetails details, Long invoiceId) {
        UserRoleEnum role = details.getRole();
        if(role != UserRoleEnum.SYSTEM_ADMIN && role != UserRoleEnum.ADMIN) {
            if(invoiceId == null) {
                return false;
            }
            //по инвойсу можно достать только если инвойс твоей компании
            Invoice invoice = invoiceService.securedFindOne(invoiceId);
            if(invoice.getTruckingCompany().getId().equals(details.getTruckingCompanyId())) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}
