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
 * @description Renderiza (desenha) os horários na tela EM FORMATO DE TABELA.
 * Pega o array de dados e cria o HTML dinamicamente.
 * @param {Array} horarios - O array de objetos de horário vindo do JSON.
 * @see Requisito 4 (DOM Dinâmico)
 * @see Requisito 2 (Arrays com .map)
 */
function renderizarHorarios(horarios) {
    console.log("Iniciando renderização (Modo Tabela)...");

    // 1. (O Salão) Pega o CORPO da tabela (tbody)
    const container = document.getElementById('resultados-container');

    // 2. (Limpar o salão) Garante que ele está vazio antes de desenhar.
    container.innerHTML = "";

    // 3. (A Mágica) Verifica se temos horários para mostrar.
    if (horarios.length === 0) {
        // Se não houver dados, mostramos uma linha de "aviso"
        // 'colspan="6"' faz esta célula única ocupar 6 colunas.
        container.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted">Nenhum horário encontrado.</td>
            </tr>
        `;
        return; // Para a função aqui
    }

    // 4. (O Host) Usa .map() para transformar CADA objeto 'horario' 
    //    em uma LINHA DE TABELA (<tr>).
    const htmlStringsArray = horarios.map(horario => {
        
        // Usamos "template literals" (o `) para montar o HTML da linha
        // Note a classe .align-middle para centralização vertical
        return `
            <tr class="align-middle">
                <td>${horario.disciplina}</td>
                <td>${horario.professor}</td>
                <td>${horario.sala}</td>
                <td>${horario.diaSemana}</td>
                <td>${horario.horarioInicio} - ${horario.horarioFim}</td>
                <td>${horario.periodo}º</td>
            </tr>
        `;
    }); // (Fonte: Os campos como 'horario.disciplina' são baseados na estrutura de 'dados.json' definida em MQS Conversa 1.md)

    // 5. (Juntar) Junta todas as <tr> em uma string única.
    const htmlFinal = htmlStringsArray.join('');

    // 6. (Desenhar) Injeta o HTML final no <tbody>.
    container.innerHTML = htmlFinal;

    console.log("Renderização (Tabela) concluída.");
}