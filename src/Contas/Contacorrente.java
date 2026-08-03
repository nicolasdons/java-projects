
package Contas;


public class Contacorrente extends Conta {
double taxa = 0.01;

    public Contacorrente(String nome, Double senha, String cpf, double saldo, double taxa) {
        super(nome, senha, cpf, saldo);
        this.taxa = taxa;


    }

        public void taxarsalario(double saldo) {
        this.saldo = saldo * taxa - saldo;
        System.out.println("Seu saldo foi taxado e atualizado para"+saldo);
        }
    }



