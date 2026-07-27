package Contas;

public class SaldoInsuficienteException extends RuntimeException {
    public SaldoInsuficienteException(String mensagem) {
        super(mensagem);
    }

    public SaldoInsuficienteException(double valor) {
        super("Saldo insuficiente para o saque de;" + valor);
    }
}


