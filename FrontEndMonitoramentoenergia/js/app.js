
function gerarDadosSolares() {
  const tensao = (34 + Math.random() * 4).toFixed(1);         // ~34V a 38V
  const corrente = (6 + Math.random() * 3).toFixed(1);         // ~6A a 9A
  const potencia = (tensao * corrente).toFixed(0);             // Watts
  const temperatura = (42 + Math.random() * 8).toFixed(1);     // ~42°C a 50°C

  return { tensao, corrente, potencia, temperatura };
}


const ctx = document.getElementById('graficoSolar').getContext('2d');
const graficoSolar = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Potência Gerada (W)',
      data: [],
      borderColor: '#f39c12',
      backgroundColor: 'rgba(243, 156, 18, 0.1)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: false }
    }
  }
});


function atualizarDashboard() {
  const dados = gerarDadosSolares();

  // Atualiza os cards numericos
  document.getElementById('potencia').innerText = dados.potencia;
  document.getElementById('tensao').innerText = dados.tensao;
  document.getElementById('corrente').innerText = dados.corrente;
  document.getElementById('temperatura').innerText = dados.temperatura;


  const horarioAtual = new Date().toLocaleTimeString();

  graficoSolar.data.labels.push(horarioAtual);
  graficoSolar.data.datasets[0].data.push(dados.potencia);


  if (graficoSolar.data.labels.length > 10) {
    graficoSolar.data.labels.shift();
    graficoSolar.data.datasets[0].data.shift();
  }

  graficoSolar.update();
}


atualizarDashboard();
setInterval(atualizarDashboard, 2000);
