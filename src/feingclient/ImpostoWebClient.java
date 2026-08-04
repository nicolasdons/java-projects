package feingclient;

import org.springframework.web.bind.annotation.GetMapping;

public interface FeignClient {

    @org.springframework.cloud.openfeign.FeignClient(name = "serviço-impostos", url = "https://api.hgbrasil.com")
   public interface feignClient {
        @GetMapping("/taxa-atual")
        double getTaxaWeb();
    }

}
