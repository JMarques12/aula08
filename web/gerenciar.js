const urlParams = new URLSearchParams(window.location.search);
const regiaoSelecionada = urlParams.get('regiao');
const listaAutomoveis = document.getElementById('listaAutomoveis');
const regiaoNome = document.getElementById('regiaoNome');

regiaoNome.textContent = regiaoSelecionada;

const automoveis = {};

document.getElementById('formAdicionar').addEventListener('submit', function(event) {
    event.preventDefault();

    const nomeCliente = document.getElementById('nomeCliente').value;
    const modeloCarro = document.getElementById('modeloCarro').value;
    const anoCarro = document.getElementById('anoCarro').value;

    // Adiciona carro à região
    if (!automoveis[regiaoSelecionada]) {
        automoveis[regiaoSelecionada] = [];
    }
    automoveis[regiaoSelecionada].push({ nomeCliente, modeloCarro, anoCarro });

    // Atualiza ocupação da região
    const regiao = document.getElementById(regiaoSelecionada);
    regiao.dataset.ocupacao = parseInt(regiao.dataset.ocupacao) + 1;
    regiao.style.backgroundColor = '#0000FF'; // Muda para azul

    exibirAutomoveis();
    
    // Limpa o formulário
    document.getElementById('formAdicionar').reset();
});

function exibirAutomoveis() {
    listaAutomoveis.innerHTML = ''; // Limpa a lista anterior

    const carrosNaRegiao = automoveis[regiaoSelecionada] || [];
    carrosNaRegiao.forEach(automovel => {
        const divAutomovel = document.createElement('div');
        divAutomovel.textContent = `Cliente: ${automovel.nomeCliente}, Modelo: ${automovel.modeloCarro}, Ano: ${automovel.anoCarro}`;
        
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = () => removerCarro(automovel);
        
        divAutomovel.appendChild(btnRemover);
        listaAutomoveis.appendChild(divAutomovel);
    });
}

function removerCarro(automovel) {
    const index = automoveis[regiaoSelecionada].indexOf(automovel);
    if (index > -1) {
        automoveis[regiaoSelecionada].splice(index, 1); // Remove o carro da lista
        const regiao = document.getElementById(regiaoSelecionada);
        regiao.dataset.ocupacao = parseInt(regiao.dataset.ocupacao) - 1; // Atualiza ocupação
        if (regiao.dataset.ocupacao == 0) {
            regiao.style.backgroundColor = '#FFFFFF'; // Volta para branco se vazio
        }
        alert(`Carro de ${automovel.nomeCliente} removido.`);
        exibirAutomoveis(); // Atualiza a lista de automóveis exibidos
    }
}
