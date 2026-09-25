import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const API_PAINEIS = 'http://localhost:8080/paineis';
const API_TELEMETRIA = 'http://localhost:8080/telemetria';

export default function App() {
  const [paineis, setPaineis] = useState([]);
  const [telemetria, setTelemetria] = useState([]);
  
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Função para buscar os dados do Spring Boot periodicamente
  useEffect(() => {
    async function carregarDados() {
      try {
        const [resPaineis, resTelemetria] = await Promise.all([
          fetch(API_PAINEIS),
          fetch(API_TELEMETRIA)
        ]);

        if (!resPaineis.ok || !resTelemetria.ok) {
          throw new Error('Erro ao buscar dados das APIs');
        }

        const paineisData = await resPaineis.json();
        const telemetriaData = await resTelemetria.json();

        setPaineis(paineisData);
        setTelemetria(telemetriaData);
        
      } catch (erro) {
        console.error('Erro na integração:', erro);
      }
    }

    carregarDados(); // Carrega na abertura
    const intervalo = setInterval(carregarDados, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(intervalo);
  }, []);

  // Efeito para desenhar e atualizar o Gráfico de Histórico de Telemetria
  useEffect(() => {
    if (!telemetria || telemetria.length === 0 || !chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    // Mapeia os valores de energia gerada vindos do Java
    const valoresPotencia = telemetria.map(item => {
      const val = item.energiagerada ?? item.energiaGerada ?? item.potencia ?? 0;
      return Number(val);
    });

    // Mapeia as horas para o eixo X do gráfico
    const rotulosHoras = telemetria.map((item, index) => {
      const dataHoraCampo = item.datahora ?? item.dataHora;
      if (dataHoraCampo) {
        const d = new Date(dataHoraCampo);
        if (!isNaN(d.getTime())) {
          return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        }
      }
      return `Leitura ${index + 1}`;
    });

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: rotulosHoras,
        datasets: [{
          label: 'Energia Gerada (W)',
          data: valoresPotencia,
          borderColor: '#fb923c',
          backgroundColor: 'rgba(251, 146, 60, 0.2)',
          borderWidth: 3,
          pointRadius: 5,
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#94a3b8' },
            grid: { color: '#334155' }
          },
          x: {
            ticks: { color: '#94a3b8' },
            grid: { color: '#334155' }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [telemetria]);

  // Obtém a última leitura para exibir a temperatura atual
  const ultimaLeitura = telemetria.length > 0 ? telemetria[telemetria.length - 1] : {};
  const temperaturaAtual = ultimaLeitura.temperatura ?? 25;

  return (
    <div style={{ backgroundColor: '#fffafa', color: '#969696', minHeight: '100vh', padding: '30px 20px', fontFamily: 'system-ui, sans-serif' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', color: '#6d6c6c', marginBottom: '5px' }}>Sistema de Monitoramento Solar</h1>
        <p style={{ color: '#94a3b8' }}>Planta Fotovoltaica com Histórico em Tempo Real</p>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        {/* Grade de Painéis Solares */}
        <section>
          <h2 style={{ fontSize: '1.1rem', color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '15px', borderBottom: '1px solid #334155', paddingBottom: '8px' }}>
            Status Visual dos Painéis Solares
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {paineis.map((painel) => {
              const estaQuente = temperaturaAtual > 40;

              return (
                <div key={painel.id || painel.codigo} style={{ background: '#b7b8b9', border: '1px solid #334155', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold', color: '#fb923c' }}> {painel.codigo}</span>
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

                
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0', position: 'relative' }}>
                    <img 
                      src="/painel-solar.png" 
                      alt="Painel Solar" 
                      style={{
                        width: '130px',
                        height: 'auto',
                        transition: 'all 0.8s ease-in-out',
                        filter: estaQuente 
                          ? 'brightness(0.9) sepia(1) hue-rotate(-50deg) saturate(500%) drop-shadow(0 0 12px rgba(239, 68, 68, 0.7))' 
                          : 'drop-shadow(0 4px 6px rgba(196, 189, 189, 0.3))'
                      }}
                    />
                  </div>

                  <div style={{ background: '#7d7f83', padding: '12px', borderRadius: '8px', border: '1px solid #334155', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ color: '#181a1d' }}>Capacidade Máx:</span>
                      <span style={{ color: '#f8fafc', fontWeight: '600' }}>{painel.capacidadeMax} W</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ color: '#121213' }}>Temperatura:</span>
                      <span style={{ color: estaQuente ? '#d86464' : '#f8fafc', fontWeight: '600' }}>
                        {Number(temperaturaAtual).toFixed(2)} °C
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px', borderTop: '1px solid #1e293b' }}>
                      <span style={{ color: '#030303' }}>Posição:</span>
                      <span style={{ color: '#f8fafc', fontWeight: '600' }}>Linha {painel.posicaoLinha} | Coluna {painel.posicaoColuna}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* Seção do Gráfico de Histórico de Telemetria */}
        <section style={{ background: '#575757', border: '1px solid #334155', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '15px', borderBottom: '1px solid #334155', paddingBottom: '8px' }}>
            Histórico de Telemetria (Energia Gerada em Watts)
          </h2>
          <div style={{ height: '300px', width: '100%', position: 'relative' }}>
            <canvas ref={chartRef}></canvas>
          </div>
        </section>

      </main>
    </div>
  );
}