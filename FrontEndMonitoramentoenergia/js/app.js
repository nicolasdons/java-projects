const API_PAINEIS = 'http://localhost:8080/paineis';
const API_TELEMETRIA = 'http://localhost:8080/telemetria';

let graficoInstance = null; 

async function carregarDados() {
  try {
   
    const [resPaineis, resTelemetria] = await Promise.all([
      fetch(API_PAINEIS),
      fetch(API_TELEMETRIA)
    ]);

    if (!resPaineis.ok || !resTelemetria.ok) {
      throw new Error('Erro ao buscar dados das APIs');
    }

    const paineis = await resPaineis.json();
    const telemetria = await resTelemetria.json();

    atualizarPainelEGrid(paineis);
    atualizarGraficoHistorico(telemetria);
    
  } catch (erro) {
    console.error('Erro na integração:', erro);
  }
}


function atualizarPainelEGrid(paineis) {
  const container = document.getElementById('paineis-container');
  if (!container) return;

  container.innerHTML = '';
  let somaCapacidade = 0;

  paineis.forEach((painel) => {
    somaCapacidade += painel.capacidadeMax;

    const card = document.createElement('div');
    card.className = 'card painel-card';
    card.id = `painel-${painel.codigo}`;
    
    card.innerHTML = `
      <h3>Painel ${painel.codigo}</h3>
      <p><strong>Capacidade Máx:</strong> ${painel.capacidadeMax} W</p>
      <p class="posicao">Linha ${painel.posicaoLinha} | Coluna ${painel.posicaoColuna}</p>
    `;

    container.appendChild(card);
  });

  const elPotencia = document.getElementById('potencia');
  if (elPotencia) elPotencia.innerText = somaCapacidade;
}


function atualizarGraficoHistorico(telemetria) {
  if (!telemetria || telemetria.length === 0) return;

  // 1. Mapeia a potência buscando 'energiagerada' (nome exato que veio do Java)
  const valoresPotencia = telemetria.map(item => {
    const val = item.energiagerada ?? item.potencia ?? item.valor ?? 0;
    return Number(val);
  });

  // 2. Mapeia a hora buscando 'datahora' (nome exato que veio do Java)
  const rotulosHoras = telemetria.map((item, index) => {
    if (item.datahora) {
      const d = new Date(item.datahora);
      if (!isNaN(d.getTime())) {
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    }
    return `Leitura ${index + 1}`;
  });

  // 3. Reinicia o Canvas
  const container = document.querySelector('.grafico-container');
  if (!container) return;

  let oldCanvas = document.getElementById('graficoSolar');
  if (oldCanvas) oldCanvas.remove();

  const newCanvas = document.createElement('canvas');
  newCanvas.id = 'graficoSolar';
  newCanvas.style.height = '300px';
  newCanvas.style.width = '100%';
  container.appendChild(newCanvas);

  // 4. Desenha o gráfico
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
          suggestedMax: 500, // Garante escala visível mesmo com valores baixos
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