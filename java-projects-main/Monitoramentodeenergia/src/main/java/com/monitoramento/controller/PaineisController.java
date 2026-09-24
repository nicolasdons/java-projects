package com.monitoramento.controller;

import com.monitoramento.entidades.Paineis;
import com.monitoramento.repository.PainelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/paineis")
@CrossOrigin(origins = "*")
public class PaineisController {

    @Autowired
    private PainelRepository painelRepository;

    @GetMapping
    public List<Paineis> listarpaineis() {
        return  painelRepository.findAll();
    }

    @PostMapping
    public Paineis cadastrarPainel(@RequestBody Paineis painel) {
        return painelRepository.save(painel);
    }



}
