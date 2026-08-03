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
   public void mensalidade(double getSaldo){
    double setSaldo = getSaldo - mensalidade;
    System.out.println("seu saldo foi atualizado devido a cobrança mensal do seguro de vida atualmente sendo:" + getSaldo);


   }
}
