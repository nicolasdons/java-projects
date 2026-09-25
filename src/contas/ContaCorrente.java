package contas; // 1. Corrigido para minúsculo (combina com o caminho da pasta)

import tributo.Tributavel;
import gerenciadordetributos.Gerenciadordetaxas;
public class ContaCorrente extends Conta implements Tributavel {
    private double taxaSelic;
    public ContaCorrente(String titular, int numero, String cpf, double saldoInicial) {
        super(titular, numero, cpf, saldoInicial);
    }








    @Override
    public double gettaxarsalario() {
        return this.getSaldo() * this.taxaSelic;
    }


    public double getmensaliade() {
        return 42.0;
    }

    public void setTaxaSelic(double taxaSelic) {
        this.taxaSelic = taxaSelic;
    }
}