document.addEventListener('DOMContentLoaded', () => {

    // Seletores do Formulário e Resultado
    const waveForm = document.getElementById('wave-form');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');

    // Seletores da Nova Visualização
    const visualSection = document.getElementById('visual-section');
    const comparisonScene = document.querySelector('.comparison-scene');
    const calculatedWave = document.getElementById('calculated-wave');
    const waveLabelText = document.getElementById('wave-label-text');
    const waveWarning = document.getElementById('wave-warning');

    // --- Configuração da Escala Visual ---
    // A altura máxima da nossa régua (em metros)
    const MAX_SCALE_METERS = 35; 
    // A altura do container em pixels (definido no CSS)
    // Usamos offsetHeight para obter o valor real renderizado
    let SCENE_HEIGHT_PIXELS = 400; // Valor padrão
    if (comparisonScene) {
         SCENE_HEIGHT_PIXELS = comparisonScene.offsetHeight;
    }
    // Calcula quantos pixels por metro
    const pixelsPerMeter = SCENE_HEIGHT_PIXELS / MAX_SCALE_METERS;
    // --------------------------------------

    waveForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const a = parseFloat(document.getElementById('a').value);
        const b = parseFloat(document.getElementById('b').value);
        const t = parseFloat(document.getElementById('t').value);
        const d = parseFloat(document.getElementById('d').value);
        const x = parseFloat(document.getElementById('x').value);

        if (isNaN(a) || isNaN(b) || isNaN(t) || isNaN(d) || isNaN(x)) {
            alert("Por favor, preencha todos os campos com números válidos.");
            return;
        }
        
        const interiorDoSen = (b * x) - t;
        const fx = a * Math.sin(interiorDoSen) + d;
        const resultadoFormatado = fx.toFixed(2);

        // 1. Exibir o Resultado Numérico
        resultText.innerHTML = `F(${x}) = <span>${resultadoFormatado} m</span>`;
        resultContainer.classList.remove('hidden');

        // 2. Controlar a Visualização
        let waveHeightInPixels = fx * pixelsPerMeter;

        // Limpa avisos anteriores
        waveWarning.classList.add('hidden');
        waveLabelText.textContent = `${resultadoFormatado} m`;

        // Se a onda for negativa (vale), mostramos como 0
        if (waveHeightInPixels < 0) {
            waveHeightInPixels = 0;
            waveLabelText.textContent = `${resultadoFormatado} m (vale)`;
        }

        // Se a onda for maior que nossa escala, ela transborda
        if (waveHeightInPixels > SCENE_HEIGHT_PIXELS) {
            waveHeightInPixels = SCENE_HEIGHT_PIXELS; // Trava no máximo
            // Mostra o aviso
            waveWarning.textContent = `AVISO: A onda de ${resultadoFormatado}m ultrapassou a escala visual de ${MAX_SCALE_METERS}m!`;
            waveWarning.classList.remove('hidden');
        }
        
        // 3. Aplicar a altura ao "nível da onda"
        calculatedWave.style.height = waveHeightInPixels + 'px';

        // 4. Mostrar a seção visual
        visualSection.classList.remove('hidden');
    });

});
