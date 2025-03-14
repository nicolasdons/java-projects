
import java.util.Scanner;



public class banco {

public static void main(String[] args) {
    
Scanner leitor= new Scanner(System.in);

           System.out.println("Escreva o numero da sua agencia");

    int agencia = leitor.nextInt();

     leitor.nextLine();
 
           System.out.println("voce declarou " + agencia + " como numero de sua agencia"); 

           System.out.println("declare seu codigo");

     String codigo = leitor.nextLine();

           System.out.println("voce declarou " + codigo + " como codigo de sua agencia");

           System.out.println("escreva seu nome");
           
     String Nome = leitor.nextLine();

        System.out.println("Seu nome foi registrado como :" + Nome);

     double saldo = 345.67;
        

        System.out.println("seu saldo é: " + saldo);
        
        System.out.println("Olá " +  Nome  + " obrigado por criar uma conta em nosso banco, sua agência é " + agencia + " conta " + codigo + " e seu saldo " + saldo + " já está disponível para saque");


}
    
}
