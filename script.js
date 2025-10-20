// Espera o conteúdo da página carregar antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    const waveForm = document.getElementById('wave-form');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const chartSection = document.getElementById('chart-section'); // Nova seção do gráfico
    const ctx = document.getElementById('waveComparisonChart').getContext('2d'); // Contexto do canvas para o Chart.js

    let waveChart = null; // Variável para armazenar a instância do gráfico

    // Dados de comparação em metros
    const comparisonData = {
        'Altura da Onda': 0, // Será atualizado com o cálculo
        'Carro (SUV médio)': 1.7,
        'Andar de prédio': 3,
        'Casa (1 andar)': 3.5,
        'Poste de Luz': 6,
        'Caminhão Articulado': 4.5,
        'Prédio baixo (3 andares)': 9,
        'Edifício comercial (10 andares)': 30,
        'Torre Eiffel (altura total)': 330,
        'Monte Everest (pico)': 8848 // Exemplo extremo
    };

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

        const resultadoFormatado = fx.toFixed(2); // Duas casas decimais para o gráfico

        resultText.innerHTML = `F(${x}) = <span>${resultadoFormatado} m</span>`;
        resultContainer.classList.remove('hidden');

        // Atualiza a altura da onda calculada nos dados de comparação
        comparisonData['Altura da Onda'] = parseFloat(resultadoFormatado);

        // -----------------------------------------------------------
        // Lógica para o Gráfico
        // -----------------------------------------------------------

        // Destrói o gráfico anterior se ele existir para evitar sobreposição
        if (waveChart) {
            waveChart.destroy();
        }

        // Prepara os dados e labels para o Chart.js
        const labels = Object.keys(comparisonData);
        const dataValues = Object.values(comparisonData);

        // Define as cores das barras
        const backgroundColors = labels.map(label => 
            label === 'Altura da Onda' ? '#0077cc' : '#aed6f1' // Cor para a onda, outra para comparações
        );
        const borderColors = labels.map(label => 
            label === 'Altura da Onda' ? '#005aa7' : '#5dade2'
        );

        waveChart = new Chart(ctx, {
            type: 'bar', // Tipo de gráfico: barras
            data: {
                labels: labels,
                datasets: [{
                    label: 'Altura em Metros',
                    data: dataValues,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Permite que o gráfico se ajuste ao seu contêiner
                indexAxis: 'y', // Faz um gráfico de barras horizontal
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Altura (metros)',
                            color: '#333',
                            font: {
                                size: 14,
                                weight: '600'
                            }
                        },
                        ticks: {
                            color: '#555'
                        },
                        grid: {
                            color: '#eee'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#555'
                        },
                        grid: {
                            color: '#eee'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Não precisa de legenda para este tipo de comparação
                    },
                    title: {
                        display: true,
                        text: 'Comparação da Altura da Onda com Referências',
                        color: '#0d324d',
                        font: {
                            size: 18,
                            weight: '700'
                        },
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.x !== null) {
                                    label += context.parsed.x + ' m';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });

        chartSection.classList.remove('hidden'); // Mostra a seção do gráfico
    });
});
