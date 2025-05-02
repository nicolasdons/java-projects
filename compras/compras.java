
import java.util.ArrayList;
import java.util.List;

public class compras {
    private List<Carrinhodecompras> listadecompras = new ArrayList<>();
  

  public void adicionaritens(String itens) {
    listadecompras.add(new Carrinhodecompras(itens));
  }

    public void removeritens(String itens) {
     List<Carrinhodecompras> itenspraremover = new ArrayList<>();
     for (Carrinhodecompras i : listadecompras) {
        if(i.getItens().equalsIgnoreCase(itens)) {
            itenspraremover.add(i);
        }
      }
            listadecompras.removeAll(itenspraremover);
        
    
}
     public void mostraritens() {
        System.out.println(listadecompras);
     }
     public static void main(String[] args) {
        compras compras1 = new compras();

        compras1.adicionaritens("molho de tomate");
        compras1.removeritens("molho de tomate");
        compras1.mostraritens();


        
     }

     }

  
