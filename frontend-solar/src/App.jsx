import React, { useState, useEffect } from 'react';

export default function App() {
  const [paineis, setPaineis] = useState([]);
  const [telemetria, setTelemetria] = useState([]);
  const [metricaAtual, setMetricaAtual] = useState({
    potencia: 0,
    tensao: 220,
    corrente: 0,
    temperatura: 25
  });

  // Busca os dados reais do Spring Boot ao carregar a página
  useEffect(() => {
    async function carregarDados() {
      try {
        const [resPaineis, resTelemetria] = await Promise.all([
          fetch('http://localhost:8080/paineis'),
          fetch('http://localhost:8080/telemetria')
        ]);

        if (!resPaineis.ok || !resTelemetria.ok) {
          throw new Error('Erro ao buscar dados do Spring Boot');
        }

        const dadosPaineis = await resPaineis.json();
        const dadosTelemetria = await resTelemetria.json();

        setPaineis(dadosPaineis);
        setTelemetria(dadosTelemetria);

        if (dadosTelemetria.length > 0) {
          const ultima = dadosTelemetria[dadosTelemetria.length - 1];
          const pot = ultima.energiaGerada ?? ultima.energiagerada ?? ultima.potencia ?? 0;
          setMetricaAtual({
            potencia: pot,
            tensao: ultima.tensao ?? 220,
            corrente: ultima.corrente ?? (pot / 220).toFixed(2),
            temperatura: ultima.temperatura ?? 25
          });
        }
      } catch (erro) {
        console.error('Erro na integração com o backend:', erro);
      }
    }

    // Carrega imediatamente ao abrir
    carregarDados();

    // Configura o navegador para repetir a busca a cada 3 segundos automaticamente
    const intervalo = setInterval(carregarDados, 3000);

    // Limpa o intervalo se o componente fechar
    return () => clearInterval(intervalo);
  }, []);

  

  return (
    <div style={styles.container}>
      
      <header style={styles.header}>
        <h1 style={styles.title}>Sistema de Monitoramento Solar</h1>
        <p style={styles.subtitle}>Painel Dinâmico integrado com Spring Boot</p>
      </header>

      <main style={styles.main}>
        <section style={{ width: '100%', maxWidth: '1200px' }}>
          
          <h2 style={styles.sectionTitle}>
            Painéis Solares Cadastrados ({paineis.length})
          </h2>

          {/* GRADE DINÂMICA: O .map percorre todos os painéis vindos da API */}
          <div style={styles.grid}>
            {paineis.map((painel) => {
              // Condição de temperatura (pode usar o dado real ou simular por painel se houver)
              const temperaturaPainel = metricaAtual.temperatura; 
              const estaQuente = temperaturaPainel > 40;

              return (
                <div key={painel.id || painel.codigo} style={styles.card}>
                  
                  <div style={styles.cardHeader}>
                    <span style={styles.cardTitle}>☀️ Painel {painel.codigo}</span>
                    <span style={{
                      ...styles.badge, 
                      backgroundColor: estaQuente ? '#450a0a' : '#022c22',
                      color: estaQuente ? '#f87171' : '#4ade80',
                      borderColor: estaQuente ? '#991b1b' : '#166534'
                    }}>
                      {estaQuente ? '⚠️ Alerta Térmico' : '● Operacional'}
                    </span>
                  </div>

                  {/* IMAGEM DO PAINEL COM ANIMAÇÃO SUAVE DE COR */}
                  <div style={styles.imageContainer}>
                    <img 
                      src="/painel-solar.png" 
                      alt="Painel Solar" 
                      style={{
                        width: '120px',
                        height: 'auto',
                        transition: 'all 0.8s ease-in-out',
                        filter: estaQuente 
                          ? 'brightness(0.9) sepia(1) hue-rotate(-50deg) saturate(500%) drop-shadow(0 0 12px rgba(239, 68, 68, 0.7))' 
                          : 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
                      }}
                    />
                  </div>

                  {/* CAIXA DE INFORMAÇÕES DO PAINEL */}
                  <div style={styles.infoBox}>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Capacidade Máx:</span>
                      <span style={styles.infoValue}>{painel.capacidadeMax} W</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Temperatura:</span>
                      <span style={{ ...styles.infoValue, color: estaQuente ? '#f87171' : '#f8fafc' }}>
                        {temperaturaPainel} °C
                      </span>
                    </div>
                    <div style={styles.infoRowLast}>
                      <span style={styles.infoLabel}>Localização:</span>
                      <span style={styles.infoValue}>Linha {painel.posicaoLinha} | Coluna {painel.posicaoColuna}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </section>
      </main>
    </div>
  );
}

// Estilos limpos para o layout
const styles = {
  container: {
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: 'system-ui, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '0.95rem',
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: '1.1rem',
    color: '#cbd5e1',
    textTransform: 'uppercase',
    marginBottom: '20px',
    borderBottom: '1px solid #334155',
    paddingBottom: '8px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#fb923c',
  },
  badge: {
    padding: '3px 8px',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: '600',
    border: '1px solid',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  infoBox: {
    backgroundColor: '#0f172a',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #334155',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '0.9rem',
  },
  infoRowLast: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '8px',
    borderTop: '1px solid #1e293b',
    fontSize: '0.9rem',
  },
  infoLabel: {
    color: '#94a3b8',
  },
  infoValue: {
    color: '#f8fafc',
    fontWeight: '600',
  },
};