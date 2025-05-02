

public class Carrinhodecompras {
    private String itens;

    public Carrinhodecompras(String itens) {
    this.itens = itens;
    }

    public String getItens() {
        return itens;
    }
 
 @Override
 public String toString(){
     return itens;
    
}
}