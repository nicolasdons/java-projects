package com.monitoramento.repository;
import com.monitoramento.entidades.Paineis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PainelRepository extends JpaRepository<Paineis,Long> {

}
