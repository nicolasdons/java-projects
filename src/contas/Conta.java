package contas;

import tributo.Tributavel;

public class Conta {
    String nome;
    Double senha;
    String cpf;
    Double saldo;


    public Conta(String nome, double senha, String cpf, double saldo){
        this.nome = nome;
        this.senha = senha;
        this.cpf = cpf;
        this.saldo = saldo;
    }


    public void saque(double valor){
        if (this.saldo < valor) {
            throw new SaldoInsuficienteException(valor); }
        this.saldo -= valor;
        }
        public void depoisto(double valor){
        this.saldo += valor;
        }

    public void pagarTributo(Tributavel t) {
        double valor = t.gettaxarsalario();
        this.saque(valor);
    }


    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getSenha() {
        return senha;
    }

    public void setSenha(Double senha) {
        this.senha = senha;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Double getSaldo() {
        return saldo;
    }

    public void setSaldo(Double saldo) {
        this.saldo = saldo;
    }
}




