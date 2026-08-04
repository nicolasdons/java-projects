import contas.ContaCorrente;
import seguro.Segurodevida;

public class Main {
    public static void main(String[] args) {

        ContaCorrente cc = new ContaCorrente("Joao", 12345, "555666777", 5000.0);

        System.out.println("Saldo inicial: R$ " + cc.getSaldo());

        cc.pagarTributo(cc);
        System.out.println("Saldo após pagar tributo da conta: R$ " + cc.getSaldo());


        Segurodevida seguro = new Segurodevida("Joao", "555666777", 42.0);
        cc.pagarTributo(seguro);
        System.out.println("Saldo após pagar tributo do seguro: R$ " + cc.getSaldo());
    }
}