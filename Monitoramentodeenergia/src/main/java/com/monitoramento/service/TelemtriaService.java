package com.monitoramento.service;

import com.monitoramento.entidades.Paineis;
import com.monitoramento.entidades.Telemetria;
import com.monitoramento.repository.PainelRepository;
import com.monitoramento.repository.TelemtriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class TelemtriaService {

    @Autowired
    private TelemtriaRepository telemteriaRepository;

    @Autowired
    private PainelRepository painelRepository;

    private final Random random = new Random();

    @Scheduled(fixedRate = 5000)
    public void geradorDeTelemetria() {
        List<Paineis> paineis = painelRepository.findAll();

        for (Paineis painel : paineis) {
            Telemetria t = new Telemetria();
            t.setPainel(painel);
            t.setDatahora(LocalDateTime.now());
            t.setTemperatura(35.0 + (85.0 - 35.0) * random.nextDouble());
            t.setEnergiagerada(100.0 + (400.0 - 100.0) * random.nextDouble());

            telemteriaRepository.save(t);
        }
    }

    public List<Telemetria> buscarHistoricoPorPainel(Long painelId) {
        return telemteriaRepository.findByPainelIdOrderByDataHoraDesc(painelId);


    }
}