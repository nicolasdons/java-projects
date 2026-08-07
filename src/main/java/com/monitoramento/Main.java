package com.monitoramento;

import com.monitoramento.entidades.Paineis;
import com.monitoramento.repository.PainelRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    public CommandLineRunner carregarDadosIniciais(PainelRepository painelRepository) {
        return args -> {
            if (painelRepository.count() == 0) {
                painelRepository.save(new Paineis("p001", 500.0, 1, 1));
                painelRepository.save(new Paineis("p002", 500.0, 1, 2));
                painelRepository.save(new Paineis("p003", 450.0, 2, 1));
                System.out.println(">>> Paineis de teste cadastrados");


            }


        };
    }
}
