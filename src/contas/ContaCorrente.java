package contas; // 1. Corrigido para minúsculo (combina com o caminho da pasta)

import tributo.Tributavel;

public class ContaCorrente extends Conta implements Tributavel {

    public ContaCorrente(String titular, int numero, String cpf, double saldoInicial) {
        super(titular, numero, cpf, saldoInicial);
    }


    @Override
    public double gettaxarsalario() {
        return this.getSaldo() * 0.01;
    }


    public double getmensaliade() {
        return 42.0;
    }
}