// Espera o conteúdo da página carregar antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do HTML que vamos usar
    const waveForm = document.getElementById('wave-form');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');

    // NOVOS: Seleciona os elementos do visualizador
    const markerPeak = document.getElementById('marker-peak');
    const markerCenter = document.getElementById('marker-center');
    const markerTrough = document.getElementById('marker-trough');
    const markerResult = document.getElementById('marker-result');


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

        // 4. Exibir o Resultado (Texto)
        
        // Formata o resultado para ter no máximo 4 casas decimais
        const resultadoFormatado = fx.toFixed(4); 

        // Atualiza o texto e remove a classe 'hidden' para mostrar
        resultText.innerHTML = `F(${x}) = <span>${resultadoFormatado}</span>`;
        

        // 5. ATUALIZAR O VISUALIZADOR (NOVA SEÇÃO)
        
        // Usamos Math.abs(a) para garantir que o pico esteja sempre acima do vale,
        // mesmo se o usuário digitar uma amplitude negativa.
        const amplitudeAbsoluta = Math.abs(a);

        if (amplitudeAbsoluta === 0) {
            // Caso especial: Onda "plana" (amplitude zero)
            markerPeak.querySelector('span').textContent = `Pico: ${d.toFixed(2)}`;
            markerCenter.querySelector('span').textContent = `Centro: ${d.toFixed(2)}`;
            markerTrough.querySelector('span').textContent = `Vale: ${d.toFixed(2)}`;
            
            // Todos os pontos ficam no meio (50%)
            markerResult.style.bottom = '50%';
            
        } else {
            // Lógica para onda normal
            const peak = d + amplitudeAbsoluta;
            const trough = d - amplitudeAbsoluta;
            const center = d;
            const totalHeight = 2 * amplitudeAbsoluta; // Distância total do vale ao pico

            // Atualiza os textos dos marcadores
            markerPeak.querySelector('span').textContent = `Pico: ${peak.toFixed(2)}`;
            markerCenter.querySelector('span').textContent = `Centro: ${center.toFixed(2)}`;
            markerTrough.querySelector('span').textContent = `Vale: ${trough.toFixed(2)}`;

            // Calcula a posição percentual do resultado F(x)
            // (Posição relativa / Altura Total) * 100
            const relativePos = fx - trough;
            let percentage = (relativePos / totalHeight) * 100;
            
            // Limita a porcentagem entre 0% e 100% (segurança)
            percentage = Math.max(0, Math.min(100, percentage));

            // Atualiza a posição vertical do marcador F(x)
            markerResult.style.bottom = `${percentage}%`;
        }

        // 6. MOSTRAR O CONTAINER DE RESULTADO
        resultContainer.classList.remove('hidden');
    });

});
