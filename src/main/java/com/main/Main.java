import contas.ContaCorrente;
import feingclient.ImpostoWebClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import seguro.Segurodevida;

@SpringBootApplication
@EnableFeignClients
public class Main {

    public static void main(String[] args) {
       var contexto = SpringApplication.run(Main.class, args);

        ImpostoWebClient clientReal = contexto.getBean(ImpostoWebClient.class);

        try {
            double taxaWeb = clientReal.getTaxaWeb();
            System.out.println("TAXA REAL DA WEB: " + taxaWeb);
        } catch (Exception e) {
            System.err.println("A API ainda não respondeu: " + e.getMessage());
        }



    }
}