
package com.mycompany.poojava;
public class ContaBanco {
  //atributos
public int numConta;
protected String tipo;
private String dono;
private float saldo;
private boolean status;

public void estadoAtual() {
    System.out.println("----------------------------");
    System.out.println("conta: " + this.getNumConta());
    System.out.println("tipo: " + this.getTipo());
    System.out.println("dono: " + this.getDono());
    System.out.println("saldo " + this.getSaldo());
    System.out.println("status " + this.getStatus());
}
//metodos
public void abrirConta(String t){
    this.setTipo(t);
    this.setStatus(true);
     if ("CC".equals(t)) {
         this.setSaldo(50);
       } else if ("CP".equals(t)){
           this.setSaldo(150 );
     }
     System.out.println("conta aberta");
}
public void fecharConta() {
    if (this.getSaldo() > 0){
        System.out.println("conta não pode ser fechada pois ainda tem debito");
    } else if (this.getSaldo() > 0){
        System.out.println("conta nao pode ser fechada pois ainda tem credito");     
    } else {
        this.setStatus(false);
    }
}
public void depositar(float v) {
    if (this.getStatus()) {
        this.setSaldo(this.getSaldo() + v);
        System.out.println("Deposito realizado com sucesso");
 } else {
        System.out.println("impossivel realizar deposito");
    }
}
public void  sacar(float v) {
  if (this.getStatus()) {
      if (this.getSaldo() >= v) {
          this.setSaldo(this.getSaldo() - v);
          System.out.println("saque realizado com sucesso");
}  else {
          System.out.println("saldo insuficiente para sacar");
     }
  } else {
       System.out.println("impossivel sacar d euma conta fechada");
    }       
  }
public void pagarMensalidade() {
    int v = 0;
    if ("CC".equals(this.getTipo())) {
        v = 12;
} else if ("CP".equals(this.getTipo())) {
    v = 20;
  }
    if (this.getStatus()){
        this.setSaldo(this.getSaldo() - v);
        System.out.println("mensalidade paga com sucesso");
} else {
        System.out.println("impossivel  pagar uma conta fechada");
}
    }
// construtor

    public ContaBanco() {
        this.saldo =0;
        this.status = false;
    }

    public int getNumConta() {
        return numConta;
    }

    public void setNumConta(int NumConta) {
        this.numConta = NumConta;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDono() {
        return dono;
    }

    public void setDono(String dono) {
        this.dono = dono;
    }

    public float getSaldo() {
        return saldo;
    }

    public void setSaldo(float saldo) {
        this.saldo = saldo;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    private boolean getStatus(){
        return this.status;
    }
       
   
}