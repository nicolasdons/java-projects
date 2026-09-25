import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function App() {
  const [paineis, setPaineis] = useState([]);
  const [telemetria, setTelemetria] = useState([]);
  const [metricaAtual, setMetricaAtual] = useState({
    potencia: 0,
    tensao: 220,
    corrente: 0,
    temperatura: 25
  });

  // Estado para simular o alerta de temperatura mudando dinamicamente (para teste)
  const [modoAlertaTeste, setModoAlertaTeste] = useState(false);

  // Efeito opcional apenas para testar a animação trocando de cor a cada 3 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setModoAlertaTeste(prev => !prev);
    }, 3000);
    return () => clearInterval(intervalo);
  }, []);

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
        console.error('Erro na integração:', erro);
      }
    }

    carregarDados();
  }, []);

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '30px 20px', fontFamily: 'system-ui, sans-serif' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '5px' }}>Sistema de Monitoramento Solar</h1>
        <p style={{ color: '#94a3b8' }}>Planta Fotovoltaica com Alerta Visual em Tempo Real</p>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Grade de Painéis Solares com a Imagem Animada */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '15px', borderBottom: '1px solid #334155', paddingBottom: '8px' }}>
            Status Visual dos Painéis Solares
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {paineis.map((painel) => {
              // Se o modo de alerta estiver ativo, simula temperatura alta (> 40°C)
              const temperaturaPainel = modoAlertaTeste ? 48 : metricaAtual.temperatura;
              const estaQuente = temperaturaPainel > 40;

              return (
                <div key={painel.id || painel.codigo} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold', color: '#fb923c' }}>☀️ {painel.codigo}</span>
                    <span style={{ 
                      background: estaQuente ? '#450a0a' : '#022c22', 
                      color: estaQuente ? '#f87171' : '#4ade80', 
                      border: `1px solid ${estaQuente ? '#991b1b' : '#166534'}`,
                      padding: '2px 8px', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {estaQuente ? '⚠️ Alerta Térmico' : '● Normal'}
                    </span>
                  </div>

                  {/* IMAGEM DO PAINEL COM TRANSIÇÃO SUAVE PARA VERMELHO */}
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0', position: 'relative' }}>
                    <img 
                      src="/painel-solar.png" 
                      alt="Painel Solar" 
                      style={{
                        width: '130px',
                        height: 'auto',
                        transition: 'all 0.8s ease-in-out', // Animação super suave
                        filter: estaQuente 
                          ? 'brightness(0.9) sepia(1) hue-rotate(-50deg) saturate(500%) drop-shadow(0 0 12px rgba(239, 68, 68, 0.7))' // Fica avermelhado e com brilho de alerta
                          : 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' // Visual normal azulado
                      }}
                    />
                  </div>

                  <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ color: '#94a3b8' }}>Capacidade Máx:</span>
                      <span style={{ color: '#f8fafc', fontWeight: '600' }}>{painel.capacidadeMax} W</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ color: '#94a3b8' }}>Temperatura:</span>
                      <span style={{ color: estaQuente ? '#f87171' : '#f8fafc', fontWeight: '600' }}>{temperaturaPainel} °C</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px', borderTop: '1px solid #1e293b' }}>
                      <span style={{ color: '#94a3b8' }}>Posição:</span>
                      <span style={{ color: '#f8fafc', fontWeight: '600' }}>Linha {painel.posicaoLinha} | Coluna {painel.posicaoColuna}</span>
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