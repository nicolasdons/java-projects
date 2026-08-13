package com.monitoramento.controller;

import com.monitoramento.entidades.Telemetria;
import com.monitoramento.service.TelemetriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/telemetria")
@CrossOrigin(origins = "*")
public class TelemetriaController {

    @Autowired
    private TelemetriaService telemetriaService; // Renomeado de repository para service


    @GetMapping
    public List<Telemetria> obterHistoricoGeral(Long painelId) {
        return telemetriaService.buscarHistoricoPorPainel(painelId);
    }


    @GetMapping("/{painelId}")
    public List<Telemetria> obterHistoricoPorPainel(@PathVariable Long painelId) {
        return telemetriaService.buscarHistoricoPorPainel(painelId);
    }
}