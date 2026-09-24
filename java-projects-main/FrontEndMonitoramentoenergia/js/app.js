const API_PAINEIS = 'http://localhost:8080/paineis';
const API_TELEMETRIA = 'http://localhost:8080/telemetria';

let graficoInstance = null; 

async function carregarDados() {
  try {
    const [resPaineis, resTelemetria] = await Promise.all([
      fetch(API_PAINEIS),
      fetch(API_TELEMETRIA)
    ]);

    const paineis = await resPaineis.json();
    const telemetria = await resTelemetria.json();

    atualizarGridPaineis(paineis, telemetria); // <--- Passa os dois argumentos aqui
    atualizarMetricasTempoReal(telemetria);
    atualizarGraficoHistorico(telemetria);
    
  } catch (erro) {
    console.error('Erro na integração:', erro);
  }
}

// 1. Apenas renderiza os cards dos painéis na grade inferior
function atualizarGridPaineis(paineis, telemetria) {
  const container = document.getElementById('paineis-container');
  if (!container) return;

  container.innerHTML = '';

  paineis.forEach((painel) => {
    // Procura a última leitura de telemetria correspondente a este painel específico
    const leiturasPainel = telemetria.filter(t => t.painel && t.painel.id === painel.id);
    const ultimaLeitura = leiturasPainel.length > 0 ? leiturasPainel[leiturasPainel.length - 1] : null;
    
    const temperatura = ultimaLeitura ? (ultimaLeitura.temperatura ?? 25) : 25;
    const potenciaGerada = ultimaLeitura ? (ultimaLeitura.energiagerada ?? 0) : 0;

    // Define a classe CSS com base na temperatura
    let classeTemperatura = 'normal';
    if (temperatura > 50 && temperatura <= 70) {
      classeTemperatura = 'atencao';
    } else if (temperatura > 70) {
      classeTemperatura = 'critico';
    }

    const card = document.createElement('div');
    // Adiciona a classe base 'card painel-card' e a classe dinâmica de temperatura
    card.className = `card painel-card ${classeTemperatura}`;
    card.id = `painel-${painel.codigo}`;
    
    card.innerHTML = `
      <h3>Painel ${painel.codigo}</h3>
      <p><strong>Gerando:</strong> ${potenciaGerada.toFixed(1)} W</p>
      <p><strong>Temp:</strong> ${temperatura.toFixed(1)} °C</p>
      <p class="posicao">Linha ${painel.posicaoLinha} | Coluna ${painel.posicaoColuna}</p>
    `;

    container.appendChild(card);
  });
}

// 2. Atualiza os 4 cards do topo usando a última leitura da telemetria
function atualizarMetricasTempoReal(telemetria) {
  if (!telemetria || telemetria.length === 0) return;

  // Pega o último objeto do array de telemetria (registro mais recente)
  const ultima = telemetria[telemetria.length - 1];

  // Ajuste os nomes das propriedades conforme o seu DTO do Spring Boot (cuidado com maiúsculas/minúsculas)
  const potenciaAtual = ultima.energiaGerada ?? ultima.energiagerada ?? ultima.potencia ?? 0;
  const tensaoAtual   = ultima.tensao ?? 0;
  const correnteAtual = ultima.corrente ?? 0;
  const tempAtual     = ultima.temperatura ?? 0;

  document.getElementById('potencia').innerText = potenciaAtual;
  document.getElementById('tensao').innerText = tensaoAtual;
  document.getElementById('corrente').innerText = correnteAtual;
  document.getElementById('temperatura').innerText = tempAtual;
}

// 3. Atualiza o gráfico de histórico
function atualizarGraficoHistorico(telemetria) {
  if (!telemetria || telemetria.length === 0) return;

  const valoresPotencia = telemetria.map(item => {
    const val = item.energiaGerada ?? item.energiagerada ?? item.potencia ?? item.valor ?? 0;
    return Number(val);
  });

  const rotulosHoras = telemetria.map((item, index) => {
    const dataHoraCampo = item.dataHora ?? item.datahora;
    if (dataHoraCampo) {
      const d = new Date(dataHoraCampo);
      if (!isNaN(d.getTime())) {
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    }
    return `Leitura ${index + 1}`;
  });

  const container = document.querySelector('.grafico-container');
  if (!container) return;

  let oldCanvas = document.getElementById('graficoSolar');
  if (oldCanvas) oldCanvas.remove();

  const newCanvas = document.createElement('canvas');
  newCanvas.id = 'graficoSolar';
  newCanvas.style.height = '300px';
  newCanvas.style.width = '100%';
  container.appendChild(newCanvas);

  const ctx = newCanvas.getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: rotulosHoras,
      datasets: [{
        label: 'Energia Gerada (W)',
        data: valoresPotencia,
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.25)',
        borderWidth: 3,
        pointRadius: 6,
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
          suggestedMax: 500,
          ticks: { color: '#333' }
        },
        x: {
          ticks: { color: '#333' }
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', carregarDados);