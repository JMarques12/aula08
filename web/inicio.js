function mostrarAutomoveis(idRegiao) {
    const ocupacao = parseInt(document.getElementById(idRegiao).getAttribute('data-ocupacao'));
    
    if (ocupacao > 0) {
        exibirAutomoveis(idRegiao);
    } else {
        alert('Esta área está vazia.');
    }
}

function exibirAutomoveis(idRegiao) {
    const listaAutomoveis = document.getElementById('listaAutomoveis');
    listaAutomoveis.innerHTML = ''; // Limpar lista anterior

    const automoveis = obterAutomoveisDaRegiao(idRegiao);

    automoveis.forEach(automovel => {
        const divAutomovel = document.createElement('div');
        divAutomovel.textContent = `Modelo: ${automovel.modelo}, Ano: ${automovel.ano}, Preço: R$ ${automovel.preco}`;
        
        const btnVender = document.createElement('button');
        btnVender.textContent = 'Vender';
        btnVender.onclick = () => abrirModalVenda(automovel);
        
        divAutomovel.appendChild(btnVender);
        listaAutomoveis.appendChild(divAutomovel);
    });

    document.getElementById('modalInformacoes').style.display = 'block'; // Mostrar modal
}

function obterAutomoveisDaRegiao(idRegiao) {
    const automoveis = [
        { modelo: 'Fusca', ano: 1970, preco: 20000, regiao: 'regiao1' },
        { modelo: 'Civic', ano: 2020, preco: 80000, regiao: 'regiao2' },
        { modelo: 'Corolla', ano: 2019, preco: 75000, regiao: 'regiao2' },
        { modelo: 'Onix', ano: 2021, preco: 60000, regiao: 'regiao4' },
    ];

    return automoveis.filter(automovel => automovel.regiao === idRegiao);
}

function abrirModalVenda(automovel) {
    alert(`Você selecionou para venda: ${automovel.modelo}`);
    // Aqui você pode implementar a lógica para abrir o modal de venda.
}

// Fechar o modal de informações
document.getElementById('fecharModal').onclick = function() {
    document.getElementById('modalInformacoes').style.display = 'none';
}

// Fechar o modal ao clicar fora da área de conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('modalInformacoes');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}