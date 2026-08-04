package feingclient; // Verifique se o nome do pacote está com 'n' mesmo

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "servico-impostos", url = "https://jsonplaceholder.typicode.com")
public interface ImpostoWebClient {
    @GetMapping("/todos/1")
    Object getTaxaWeb();
}