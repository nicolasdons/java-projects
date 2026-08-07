package com.monitoramento.controller;

import com.monitoramento.entidades.Telemetria;
import com.monitoramento.service.TelemtriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/telemetria")
@CrossOrigin(origins = "*")
public class TelemetriaController {

    @Autowired
    private TelemtriaService telemtriaService;

    @GetMapping("/{paineilId}")
    public List<Telemetria> obterHistoricoPorPainel(@PathVariable Long painelId){
        return telemtriaService.buscarHistoricoPorPainel(painelId);
    }
}
