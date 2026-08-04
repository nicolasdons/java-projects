package feingclient;

import org.springframework.web.bind.annotation.GetMapping;

public interface Feingclientservice {

    @FeingClient(name = "serviço-impostos", url = "http...")
    public interface Feingclientservice{
        @GetMapping("/taxa-atual")
        double getTaxaWeb();
    }

}
