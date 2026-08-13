package com.monitoramento.repository;

import com.monitoramento.entidades.Telemetria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TelemetriaRepository extends JpaRepository<Telemetria, Long> {

    List<Telemetria> findByPainelIdOrderByDataHoraDesc(Long painelId);
}
