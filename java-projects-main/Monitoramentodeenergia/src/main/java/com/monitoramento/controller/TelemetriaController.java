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
    private TelemetriaService telemetriaService;

    @GetMapping
    public List<Telemetria> obterHistoricoGeral(@RequestParam(required = false) Long painelId) {
        if (painelId != null) {
            return telemetriaService.buscarHistoricoPorPainel(painelId);
        }
        return telemetriaService.buscarTodos(); // Retorna todas as telemetrias se nenhum ID for passado
    }

    @GetMapping("/{painelId}")
    public List<Telemetria> obterHistoricoPorPainel(@PathVariable Long painelId) {
        return telemetriaService.buscarHistoricoPorPainel(painelId);
    }
}