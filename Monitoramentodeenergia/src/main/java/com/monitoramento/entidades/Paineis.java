package com.monitoramento.entidades;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_painel")
public class Paineis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;
    private Double capacidadeMax;
    private Integer posicaoLinha;
    private Integer posicaoColuna;

    public Paineis(){

    }

    public Paineis(String codigo, Double capacidadeMax, Integer posicaoLinha, Integer posicaoColuna) {
        this.codigo = codigo;
        this.capacidadeMax = capacidadeMax;
        this.posicaoLinha = posicaoLinha;
        this.posicaoColuna = posicaoColuna;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Double getCapacidadeMax() {
        return capacidadeMax;
    }

    public void setCapacidadeMax(Double capacidadeMax) {
        this.capacidadeMax = capacidadeMax;
    }

    public Integer getPosicaoLinha() {
        return posicaoLinha;
    }

    public void setPosicaoLinha(Integer posicaoLinha) {
        this.posicaoLinha = posicaoLinha;
    }

    public Integer getPosicaoColuna() {
        return posicaoColuna;
    }

    public void setPosicaoColuna(Integer posicaoColuna) {
        this.posicaoColuna = posicaoColuna;
    }
}
