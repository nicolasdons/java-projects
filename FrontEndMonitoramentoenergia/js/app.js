
const API_URL = 'http://localhost:8080/api/paineis';


async function carregarDados() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Status: ${response.status}`);

    const dados = await response.json();
    atualizarTela(dados);
  } catch (erro) {
    console.error('Erro na conexão com o Java:', erro);
  }
}


function atualizarTela(paineis) {

  paineis.forEach((painel) => {
    const card = document.getElementById(`painel-${painel.id}`);
    if (card) {
      card.querySelector('.temperatura').innerText = `${painel.temperatura} °C`;
      card.querySelector('.potencia').innerText = `${painel.potencia} kW`;


      if (painel.temperatura > 60) {
        card.classList.add('alerta-critico');
      } else {
        card.classList.remove('alerta-critico');
      }
    }
  });
}


setInterval(carregarDados, 3000);
document.addEventListener('DOMContentLoaded', carregarDados);

// (Mantenha aqui embaixo a criação do gráfico Chart.js se você já tiver!)
