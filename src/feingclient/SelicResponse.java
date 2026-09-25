package feingclient;
import java.util.List;
public class SelicResponse {
    public List<DadosSelic> value;

    public static class DadosSelic {
        public double valor;
    }
}
