package com.monitoramento.service;

import com.monitoramento.entidades.Paineis;
import com.monitoramento.repository.PainelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PainelService {

    @Autowired
    private PainelRepository painelRepository;

    public List<Paineis> listarTodos() {
        return painelRepository.findAll();
    }

    public Paineis salvar(Paineis painel){
       return painelRepository.save(painel);
    }
}
