// Espera o conteúdo da página carregar antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do HTML que vamos usar
    const waveForm = document.getElementById('wave-form');
    const resultContainer = document.getElementById('result-container');

    // --- NOVOS ELEMENTOS DA CENA ---
    const buildingHeightInput = document.getElementById('building-height');
    const tsunamiWaveEl = document.getElementById('tsunami-wave');
    const buildingEl = document.getElementById('building');
    
    const waveLabel = document.getElementById('wave-label');
    const buildingLabel = document.getElementById('building-label');
    
    const comparisonResultText = document.getElementById('comparison-result-text');
    const resultText = document.getElementById('result-text');
    // --- FIM DOS NOVOS ELEMENTOS ---


    // Adiciona um "ouvinte" para o evento de 'submit' (clique no botão)
    waveForm.addEventListener('submit', (event) => {
        // Impede que o formulário recarregue a página
        event.preventDefault();

        // 1. Obter os valores dos inputs
        const a = parseFloat(document.getElementById('a').value);
        const b = parseFloat(document.getElementById('b').value);
        const t = parseFloat(document.getElementById('t').value);
        const d = parseFloat(document.getElementById('d').value);
        const x = parseFloat(document.getElementById('x').value);
        const buildingHeight = parseFloat(buildingHeightInput.value);

        // 2. Validar se todos os campos são números
        if (isNaN(a) || isNaN(b) || isNaN(t) || isNaN(d) || isNaN(x) || isNaN(buildingHeight)) {
            alert("Por favor, preencha todos os campos com números válidos.");
            return;
        }

        // 3. Executar o Cálculo
        // F(x) = a * sen(b*x - t) + d
        const fx = a * Math.sin(b * x - t) + d;

        // --- 4. ATUALIZAR A VISUALIZAÇÃO ---

        // Para a simulação, consideramos que a "altura" do tsunami é o valor F(x).
        // Se F(x) for negativo (um vale), tratamos como altura 0 para a colisão.
        const tsunamiHeight = Math.max(0, fx);

        // Altura máxima da nossa "cena" em pixels
        const scenePixelHeight = 300; 

        // Encontrar o maior valor (prédio ou onda) para escalar a visualização
        // Adicionamos 1 para evitar divisão por zero
        const maxValue = Math.max(buildingHeight, tsunamiHeight, 1);

        // Calcular a altura em pixels para cada elemento
        // (Valor / Valor Máximo) * Altura Total da Cena
        const buildingPixelHeight = (buildingHeight / maxValue) * scenePixelHeight;
        const tsunamiPixelHeight = (tsunamiHeight / maxValue) * scenePixelHeight;

        // Aplicar as alturas calculadas ao CSS
        buildingEl.style.height = `${buildingPixelHeight}px`;
        tsunamiWaveEl.style.height = `${tsunamiPixelHeight}px`;

        // Atualizar os rótulos de altura
        buildingLabel.textContent = `Prédio: ${buildingHeight.toFixed(1)}m`;
        waveLabel.textContent = `Tsunami: ${tsunamiHeight.toFixed(1)}m`;

        // --- 5. EXIBIR O RESULTADO (TEXTO) ---

        // Atualizar o texto de comparação (Perigo / Seguro)
        if (tsunamiHeight > buildingHeight) {
            comparisonResultText.textContent = "O Tsunami é mais alto que o prédio!";
            comparisonResultText.style.color = "#d93025"; // Vermelho
        } else if (tsunamiHeight > 0) {
            comparisonResultText.textContent = "O prédio é mais alto que a onda.";
            comparisonResultText.style.color = "#1e8e3e"; // Verde
        } else {
            comparisonResultText.textContent = "Nenhum tsunami (F(x) ≤ 0).";
            comparisonResultText.style.color = "#555"; // Cinza
        }
        
        // Atualizar o texto do cálculo exato
        const resultadoFormatado = fx.toFixed(4); 
        resultText.innerHTML = `F(${x}) = <span>${resultadoFormatado}</span>`;
        
        // 6. MOSTRAR O CONTAINER DE RESULTADO
        resultContainer.classList.remove('hidden');
    });
});
