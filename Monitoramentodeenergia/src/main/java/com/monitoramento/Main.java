package com.monitoramento;

import com.monitoramento.entidades.Paineis;
import com.monitoramento.entidades.Telemetria;
import com.monitoramento.repository.PainelRepository;
import com.monitoramento.repository.TelemetriaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class Main {

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    public CommandLineRunner carregarDadosIniciais(
            PainelRepository painelRepository,
            TelemetriaRepository telemetriaRepository) {
        return args -> {

            telemetriaRepository.deleteAll();
            painelRepository.deleteAll();


            Paineis p1 = painelRepository.save(new Paineis("P001", 500.0, 1, 1));
            Paineis p2 = painelRepository.save(new Paineis("P002", 500.0, 1, 2));
            painelRepository.save(new Paineis("P003", 450.0, 2, 1));
            painelRepository.save(new Paineis("P004", 450.0, 2, 2));
            painelRepository.save(new Paineis("P005", 500.0, 3, 1));
            painelRepository.save(new Paineis("P006", 500.0, 3, 2));


            double[] potenciasSimuladas = {100.0, 350.0, 800.0, 1500.0, 2400.0, 2900.0, 2700.0, 1800.0, 900.0, 200.0};
            LocalDateTime horaInicial = LocalDateTime.now().minusHours(10);

            for (int i = 0; i < potenciasSimuladas.length; i++) {
                LocalDateTime dataHora = horaInicial.plusHours(i);
                double potencia = 2;
                double tensao = 220.0;
                double corrente = potencia / tensao;
                double temperatura = 25.0 + (potencia / 100.0);


                telemetriaRepository.save(new Telemetria());
            }

            System.out.println(">>> [SUCESSO] Painéis e Histórico de Telemetria gerados com sucesso!");
        };
    }
}