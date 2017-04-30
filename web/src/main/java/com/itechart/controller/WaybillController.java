package com.itechart.controller;


import com.itechart.entity.CheckPoint;
import com.itechart.entity.Waybill;
import com.itechart.entity.WaybillState;
import com.itechart.services.CheckPointService;
import com.itechart.services.WaybillService;
import com.itechart.services.WaybillStateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.stereotype.Controller;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Controller
public class WaybillController {


    @Autowired
    private WaybillService waybillService;
    @Autowired
    private WaybillStateService waybillStateService;
    @Autowired
    private CheckPointService checkPointService;


    @ModelAttribute("waybill")
    public Waybill getWaybill()
    {
        return new Waybill();
    }


    @RequestMapping(value = "/show-waybills",method = RequestMethod.GET)
    public ModelAndView getAllWaybills(){

        List<Waybill> waybills = waybillService.findAll();
        List<CheckPoint> checkPoints = checkPointService.findAll();
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("waybill");
        Map<String, Object> modelMap = new HashMap<>();
        modelMap.put("waybills", waybills);
        modelMap.put("checkPoints",checkPoints);
        modelAndView.addAllObjects(modelMap);
        return modelAndView;
    }


    @RequestMapping(value = "/edit-waybill{id}",method = RequestMethod.GET)
    public ModelAndView editWaybill(@PathVariable("id") long id){
        Waybill waybill = waybillService.findWaybill(id);
        ModelAndView modelAndView = new ModelAndView();
        List<WaybillState> waybillStates = waybillStateService.findAll();
        List<CheckPoint> checkPoints = checkPointService.findAll();
        modelAndView.setViewName("saveWaybill");
        Map<String, Object> modelMap = new HashMap<>();
        modelMap.put("states",waybillStates);
        modelMap.put("checkPoints",checkPoints);
        modelMap.put("waybill",waybill);
        modelAndView.addAllObjects(modelMap);
        return modelAndView;
    }



    @RequestMapping(value = "/delete-waybill{id}",method = RequestMethod.GET)
    public String deleteWaybillById(@PathVariable("id") long id){
        waybillService.delete(id);
        return "redirect:/show-waybills";
    }




    @RequestMapping(value = "/add-waybill",method = RequestMethod.GET)
    public ModelAndView addWaybill(){
        ModelAndView modelAndView = new ModelAndView();
        List<WaybillState> waybillStates = waybillStateService.findAll();
        List<CheckPoint> checkPoints = checkPointService.findAll();
        modelAndView.setViewName("saveWaybill");
        Map<String, Object> modelMap = new HashMap<>();
        modelMap.put("states",waybillStates);
        modelMap.put("checkPoints",checkPoints);
        modelAndView.addAllObjects(modelMap);
        return modelAndView;
    }




    @RequestMapping(value = "/save-waybill", method = RequestMethod.POST)
    public String insertWaybill(@Valid Waybill waybill,BindingResult bindingResult,HttpServletRequest request){

        if (bindingResult.hasErrors())
        {
            List<WaybillState> waybillStates = waybillStateService.findAll();
            List<CheckPoint> checkPoints = checkPointService.findAll();
            request.setAttribute("checkPoints", checkPoints);
            request.setAttribute("states",waybillStates);
            return "saveWaybill";
        }
        Waybill waybill1 = waybillService.save(waybill);
        saveCheckPoints(waybill1, request);
        return "redirect:/show-waybills";
    }




    private void saveCheckPoints(Waybill waybill, HttpServletRequest request){
        Enumeration<String> paramNames = request.getParameterNames();
        List<CheckPoint> checkPoints = new ArrayList<>();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Pattern p = Pattern.compile("description\\d+");
        while(paramNames.hasMoreElements()) {
            String paramName = paramNames.nextElement();
            Matcher m = p.matcher(paramName);

            if (m.matches()) {
                long i = Long.parseLong(paramName.substring(11));
                String desc = request.getParameter("description"+i);
                String latitude = request.getParameter("latitude"+i);
                String longitude = request.getParameter("longitude"+i);
                String pathDate = request.getParameter("pathDate"+i);
                java.util.Date date = null;

                try {
                    date = format.parse(pathDate);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                CheckPoint checkPoint = new CheckPoint();
                checkPoint.setWaybill(waybill);
                checkPoint.setDescription(desc);
                checkPoint.setLongitude(longitude);
                checkPoint.setLatitude(latitude);
                checkPoint.setPathDate(date);
                checkPoints.add(checkPoint);
            }
        }
        checkPointService.deleteAll();
        for (CheckPoint checkPoint : checkPoints){
            checkPointService.save(checkPoint);
        }

    }


}
