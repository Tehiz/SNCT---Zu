// Espera o conteúdo da página carregar antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do HTML que vamos usar
    const waveForm = document.getElementById('wave-form');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');

    // Adiciona um "ouvinte" para o evento de 'submit' (clique no botão)
    waveForm.addEventListener('submit', (event) => {
        // Impede que o formulário recarregue a página
        event.preventDefault();

        // 1. Obter os valores dos inputs
        // Usamos parseFloat para converter o texto do input em números decimais
        const a = parseFloat(document.getElementById('a').value);
        const b = parseFloat(document.getElementById('b').value);
        const t = parseFloat(document.getElementById('t').value);
        const d = parseFloat(document.getElementById('d').value);
        const x = parseFloat(document.getElementById('x').value);

        // 2. Validar se todos os campos são números
        if (isNaN(a) || isNaN(b) || isNaN(t) || isNaN(d) || isNaN(x)) {
            alert("Por favor, preencha todos os campos com números válidos.");
            return;
        }

        // 3. Executar o Cálculo
        // F(x) = a * sen(b*x - t) + d
        // Math.sin() em JavaScript calcula o seno em RADIANOS.
        // A "Frequência Angular" (b) já costuma estar preparada para isso.
        
        const interiorDoSen = (b * x) - t;
        const fx = a * Math.sin(interiorDoSen) + d;

        // 4. Exibir o Resultado
        
        // Formata o resultado para ter no máximo 4 casas decimais
        const resultadoFormatado = fx.toFixed(4); 

        // Atualiza o texto e remove a classe 'hidden' para mostrar
        resultText.innerHTML = `F(${x}) = <span>${resultadoFormatado}</span>`;
        resultContainer.classList.remove('hidden');
    });

});
