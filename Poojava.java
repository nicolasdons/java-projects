
package com.mycompany.poojava;
public class Poojava {

    public static void main(String[] args) {
         ContaBanco p1 = new ContaBanco(); 
       p1.setNumConta(1111);
       p1.setDono("gabriel");
       p1.abrirConta("CC"); 
   
       
       ContaBanco p2 = new ContaBanco();
       p2.setNumConta(3333);
       p2.setDono("carol");
       p2.abrirConta("CP");
       
        p1.depositar(0);
        p2.depositar(0);
       
    
       p1.estadoAtual();
       p2.estadoAtual();
       
} 
}