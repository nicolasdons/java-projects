package Contas;

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

    }




