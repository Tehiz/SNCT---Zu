/* --- Configurações Globais e de Fundo --- */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Montserrat', sans-serif;
    background: linear-gradient(135deg, #005aa7, #0d324d);
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1.5rem;
}

/* --- Container Principal da Calculadora --- */
.wave-container {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 2.5rem;
    max-width: 700px; /* Aumentei um pouco para o gráfico */
    width: 100%;
    text-align: center;
}

/* --- Títulos e Textos --- */
h1 {
    color: #0d324d;
    margin-bottom: 0.5rem;
}

.formula {
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.25rem;
    font-style: italic;
    color: #555;
    margin-bottom: 2rem;
}

hr {
    border: 0;
    height: 1px;
    background: #e0e0e0;
    margin: 1.5rem 0;
}

/* --- Layout dos Inputs (Responsivo) --- */
.input-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

.input-group,
.input-group-full {
    text-align: left;
}

/* --- Estilo dos Inputs e Labels --- */
label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #005aa7;
}

input[type="number"] {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    font-family: 'Montserrat', sans-serif;
    transition: border-color 0.3s, box-shadow 0.3s;
}

input[type="number"]:focus {
    outline: none;
    border-color: #005aa7;
    box-shadow: 0 0 5px rgba(0, 90, 167, 0.5);
}

/* --- Botão de Calcular --- */
button {
    width: 100%;
    padding: 1rem;
    background: #0077cc;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    margin-top: 1.5rem;
    transition: background-color 0.3s ease;
}

button:hover {
    background: #005aa7;
}

/* --- Área de Resultado --- */
#result-container {
    margin-top: 2rem;
    padding: 1.5rem;
    background: #f4f8ff;
    border-radius: 8px;
    border: 1px dashed #005aa7;
}

#result-container h2 {
    color: #0d324d;
    margin-bottom: 0.5rem;
}

#result-text {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
}

#result-text span {
    color: #0077cc;
    font-size: 2rem;
}

/* --- Seção do Gráfico --- */
#chart-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e0e0e0;
}

#chart-section h2 {
    color: #0d324d;
    margin-bottom: 1.5rem;
}

.chart-container {
    position: relative;
    width: 100%;
    /* Altura para manter a proporção do gráfico */
    height: 350px; 
}


/* Classe para esconder/mostrar o resultado */
.hidden {
    display: none;
}

/* --- Responsividade para Celulares --- */
@media (max-width: 600px) {
    body {
        padding: 1rem;
    }

    .wave-container {
        padding: 1.5rem;
    }

    .input-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    h1 {
        font-size: 1.8rem;
    }
    
    .chart-container {
        height: 300px; /* Ajusta a altura em telas menores */
    }
}
