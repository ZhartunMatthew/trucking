package com.itechart.controller;

import com.itechart.entity.Auto;
import com.itechart.services.AutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/auto")
public class AutoController {
    @Autowired
    private AutoService service;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Auto> getById(@PathVariable Long id) {
        Auto auto = service.findOne(id);
        return new ResponseEntity<>(auto, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<Auto>> findAll() {
        List<Auto> autos = service.findAll();
        return new ResponseEntity<>(autos, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public void create(@RequestBody Auto auto) {
        service.save(auto);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public ResponseEntity<Auto> update(@RequestBody Auto auto) {
        service.save(auto);
        return new ResponseEntity<>(auto, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
