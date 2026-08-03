package Seguro;
import Contas.Conta;

public class Segurodevida {
String nome;
String cpf;
double mensalidade = 42;

public Segurodevida(String nome,String cpf,double mensalidade){
    this.nome = nome;
    this.cpf = cpf;
    this.mensalidade = mensalidade;
}
   public double mensalidade(double getSaldo){
    double setSaldo = getSaldo - mensalidade;
    System.out.println("seu saldo foi atualizado devido a cobrança mensal do seguro de vida atualmente sendo:");
       return getSaldo;



   }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public double getMensalidade() {
        return mensalidade;
    }

    public void setMensalidade(double mensalidade) {
        this.mensalidade = mensalidade;
    }
}
