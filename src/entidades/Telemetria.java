package entidades;

@Entity
@Table(name = "tb_telemetria")
public class Telemetria {

    @Id
    @GeneretadedValue(strategy = GenerationType.INDENTITY)
    private Long id;

    double temperatura;
    double energiagerada;
    private localDateTime datahora;


    @ManyToOne
    @JoinColumn(name = "painel_id")
    private Painel painel;
}

