/*
 * MQS - "Mano Qual é a Sala!?"
 * Arquivo principal do JavaScript (app.js)
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("MQS App Iniciado. DOM pronto.");
    
    // Inicia a carga dos dados
    carregarDados();
});


/**
 * @description Carrega os dados dos horários do arquivo dados.json.
 * @see Requisito 5 (Assíncrono Fetch)
 * @see Requisito 6 (async/await + try/catch)
 */
async function carregarDados() {
    console.log("Iniciando busca de dados (fetch)...");
    
    // Seleciona os containers de feedback (Semana 8)
    const loadingFeedback = document.getElementById('loading-feedback');
    const errorFeedback = document.getElementById('error-feedback');

    // Mostra o "Carregando..." (Início da Semana 8)
    if (loadingFeedback) {
        loadingFeedback.textContent = "Carregando horários...";
    }

    try {
        const response = await fetch('./dados.json');

        if (!response.ok) {
            throw new Error(`Erro de HTTP: Status ${response.status}`);
        }

        const dados = await response.json();

        console.log("Dados carregados com sucesso:");
        console.log(dados);

        // Limpa o "Carregando..."
        if (loadingFeedback) {
            loadingFeedback.textContent = "";
        }

        // *** NOSSA NOVA LINHA DA SEMANA 3 ***
        // Chama a função para "desenhar" os dados na tela.
        renderizarHorarios(dados);

    } 
    catch (error) {
        console.error("Falha ao carregar os dados:", error.message);
        
        // Limpa o "Carregando..." e mostra o erro (Semana 8)
        if (loadingFeedback) {
            loadingFeedback.textContent = "";
        }
        if (errorFeedback) {
            errorFeedback.textContent = "Falha ao carregar os dados. Verifique a conexão ou o arquivo 'dados.json'.";
            errorFeedback.classList.remove('d-none'); // Mostra o alerta de erro
        }
    }
}


/**
 * @description Renderiza os horários em formato de GRADE SEMANAL (Matriz).
 * @param {Array} horarios - O array de objetos vindo do JSON.
 */
function renderizarHorarios(horarios) {
    console.log("Renderizando Grade Semanal...");
    const container = document.getElementById('resultados-container');
    container.innerHTML = ""; // Limpa a tabela

    // 1. Definição dos Slots de Tempo (Baseado no seu Protótipo)
    // Nota: Adicionei o 'id' para facilitar comparações futuras se precisar.
    const slots = [
        { label: "1ª Aula", inicio: "07:30", fim: "08:15" },
        { label: "2ª Aula", inicio: "08:15", fim: "09:00" },
        { label: "Intervalo", inicio: "09:00", fim: "09:15", intervalo: true }, // Marcador de intervalo
        { label: "3ª Aula", inicio: "09:15", fim: "10:00" },
        { label: "4ª Aula", inicio: "10:00", fim: "10:45" },
        // Adicione 5ª e 6ª aulas aqui se necessário
    ];

    const diasSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];

    // 2. Construção das Linhas (Iteramos por cada slot de tempo)
    const htmlFinal = slots.map(slot => {
        
        // Se for intervalo, renderiza uma linha especial (Visual do Protótipo)
        if (slot.intervalo) {
            return `
                <tr class="table-secondary fw-bold">
                    <td class="align-middle">${slot.inicio} - ${slot.fim}</td>
                    <td colspan="5" class="align-middle">INTERVALO</td>
                </tr>
            `;
        }

        // Se for aula, precisamos descobrir qual matéria acontece neste dia/hora
        const celulasDias = diasSemana.map(dia => {
            // A BUSCA (Core da Lógica):
            // Encontra uma aula que seja neste DIA e que "cubra" este slot de tempo.
            // Lógica: O slot começa DEPOIS OU JUNTO da aula E termina ANTES OU JUNTO da aula.
            // Isso resolve aulas duplas (ex: 09:15 as 10:45 vai aparecer em 2 slots).
            const aula = horarios.find(h => 
                h.diaSemana === dia && 
                h.horarioInicio <= slot.inicio && 
                h.horarioFim >= slot.fim
            );

            if (aula) {
                // Célula preenchida (Com layout interno vertical: Matéria > Prof > Sala)
                return `
                    <td class="align-middle p-2">
                        <div class="fw-bold text-primary small">${aula.disciplina}</div>
                        <div class="text-muted small" style="font-size: 0.85rem;">${aula.professor}</div>
                        <div class="badge bg-light text-dark border mt-1">${aula.sala}</div>
                    </td>
                `;
            } else {
                // Célula vazia
                return `<td class="align-middle text-muted">-</td>`;
            }
        }).join('');

        // Retorna a linha completa do slot (Hora + 5 Células)
        return `
            <tr>
                <td class="align-middle fw-bold bg-light">
                    <div class="small text-muted">${slot.label}</div>
                    <div>${slot.inicio} <br> ${slot.fim}</div>
                </td>
                ${celulasDias}
            </tr>
        `;
    }).join('');

    container.innerHTML = htmlFinal;
}