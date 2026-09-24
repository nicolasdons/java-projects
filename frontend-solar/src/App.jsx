import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function App() {
  const [paineis, setPaineis] = useState([]);
  const [telemetria, setTelemetria] = useState([]);
  
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resPaineis, resTelemetria] = await Promise.all([
          fetch('http://localhost:8080/paineis'),
          fetch('http://localhost:8080/telemetria')
        ]);

        if (resPaineis.ok && resTelemetria.ok) {
          const pData = await resPaineis.json();
          const tData = await resTelemetria.json();
          setPaineis(pData);
          setTelemetria(tData);
        }
      } catch (err) {
        console.error("Erro ao buscar dados do Spring Boot:", err);
      }
    }

    carregarDados();
  }, []);

  // Configuração e desenho do Gráfico
  useEffect(() => {
    if (telemetria.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const valoresPotencia = telemetria.map(item => item.energiagerada ?? item.energiaGerada ?? 0);
    
    const rotulosHoras = telemetria.map((item, index) => {
      const dataCampo = item.datahora ?? item.dataHora;
      if (dataCampo) {
        const d = new Date(dataCampo);
        if (!isNaN(d.getTime())) {
          return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.2)',
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
          y: { beginAtZero: true, suggestedMax: 500 }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [telemetria]);

  // Última leitura para preencher os cards do topo
  const ultima = telemetria.length > 0 ? telemetria[telemetria.length - 1] : {};
  const potenciaAtual = ultima.energiagerada ?? ultima.energiaGerada ?? 0;
  const tensaoAtual = ultima.tensao ?? 220.0;
  const correnteAtual = ultima.corrente ?? (potenciaAtual / tensaoAtual).toFixed(2);
  const temperaturaAtual = ultima.temperatura ?? 0;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Sistema de Monitoramento Solar</h1>
        <p className="text-gray-600">Dados em tempo real da planta fotovoltaica</p>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        
        {/* Métricas do Topo */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b-2 border-gray-300 pb-2">Métricas Gerais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-lg shadow border-l-4 border-amber-500">
              <h3 className="text-xs font-bold text-gray-500 uppercase">Potência Atual</h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">{Number(potenciaAtual).toFixed(1)} W</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow border-l-4 border-amber-500">
              <h3 className="text-xs font-bold text-gray-500 uppercase">Tensão (PV)</h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">{tensaoAtual} V</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow border-l-4 border-amber-500">
              <h3 className="text-xs font-bold text-gray-500 uppercase">Corrente</h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">{correnteAtual} A</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow border-l-4 border-amber-500">
              <h3 className="text-xs font-bold text-gray-500 uppercase">Temp. do Painel</h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">{Number(temperaturaAtual).toFixed(1)} °C</p>
            </div>
          </div>
        </section>

        {/* Grade dos Painéis */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b-2 border-gray-300 pb-2">Painéis Solares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {paineis.map(painel => (
              <div key={painel.id} className="bg-white p-5 rounded-lg shadow border-l-4 border-amber-500">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Painel {painel.codigo}</h3>
                <p className="text-gray-600 text-sm"><strong>Capacidade Máx:</strong> {painel.capacidadeMax} W</p>
                <p className="text-gray-400 text-xs mt-1">Linha {painel.posicaoLinha} | Coluna {painel.posicaoColuna}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gráfico Histórico */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b-2 border-gray-300 pb-2">Histórico de Potência (Watts)</h2>
          <div className="h-72 w-full">
            <canvas ref={chartRef}></canvas>
          </div>
        </section>

      </main>
    </div>
  );
}