package com.main;

import contas.ContaCorrente;
import feingclient.ImpostoWebClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.ApplicationContext;
import gerenciadordetributos.Gerenciadordetaxas;

@SpringBootApplication
@EnableFeignClients(basePackages = "feingclient")
public class Main {

    public static void main(String[] args) {
        ApplicationContext contexto = SpringApplication.run(Main.class, args);
        ImpostoWebClient client = contexto.getBean(ImpostoWebClient.class);
        double taxaSelic = client.getTaxaWeb().get(0).valor;
        System.out.println("SELIC REAL HOJE: " + taxaSelic);
        ContaCorrente cc = new ContaCorrente("joao",3452424,"666777444",36789);
        System.out.println("O saldo atual de Jõao é:" + cc.getSaldo());
        cc.depoisto(1500);
        cc.setTaxaSelic(taxaSelic);
        System.out.println("Após a tributação da taxa seu saldo é" + cc.getSaldo());


    }
}