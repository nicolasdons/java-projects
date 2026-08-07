package com.monitoramento.entidades;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tb_telemetria")
public class Telemetria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    double temperatura;
    double energiagerada;
    private LocalDateTime dataHora;


    @ManyToOne
    @JoinColumn(name = "painel_id")
    private Paineis painel;

    public Telemetria() {

    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Telemetria(Long id) {
        this.id = id;
    }

    public double getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(double temperatura) {
        this.temperatura = temperatura;
    }

    public double getEnergiagerada() {
        return energiagerada;
    }

    public void setEnergiagerada(double energiagerada) {
        this.energiagerada = energiagerada;
    }

    public LocalDateTime getDatahora() {
        return dataHora;
    }

    public void setDatahora(LocalDateTime datahora) {
        this.dataHora = dataHora;
    }

    public Paineis getPainel() {
        return painel;
    }

    public void setPainel(Paineis painel) {
        this.painel = painel;
    }
}

