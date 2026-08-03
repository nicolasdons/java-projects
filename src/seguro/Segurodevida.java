package seguro;
import contas.Conta;
import tributo.Tributavel;


public class Segurodevida implements Tributavel {
    private Conta conta;


    String nome;
    String cpf;
    double mensalidade = 42;

    public Segurodevida(String nome, String cpf, double mensalidade) {
        this.nome = nome;
        this.cpf = cpf;
        this.mensalidade = mensalidade;
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



  @Override
 public double gettaxarsalario() {
          return 42 + (this.mensalidade * 0.02);
  }




}
