package feingclient; // Verifique se o nome do pacote está com 'n' mesmo

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "bcb-selic", url = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados")
public interface ImpostoWebClient {
    @GetMapping("/ultimos/1")
    List<SelicResponse.DadosSelic> getTaxaWeb();
}