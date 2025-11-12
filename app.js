/*
 * MQS - "Mano Qual é a Sala!?"
 * Arquivo principal do JavaScript (app.js)
 */

// Este 'ouvinte de evento' garante que nosso script só vai rodar
// DEPOIS que todo o HTML (index.html) for carregado.
// É o nosso "porteiro": só começa o trabalho quando a casa está pronta.
document.addEventListener('DOMContentLoaded', () => {
    console.log("MQS App Iniciado. DOM pronto.");
    
    // Inicia a carga dos dados
    carregarDados();
});


/**
 * @description Carrega os dados dos horários do arquivo dados.json.
 * Usa o método moderno async/await com try/catch.
 * * @see Requisito 5 (Assíncrono Fetch) [cite: 94, 112]
 * @see Requisito 6 (async/await + try/catch) 
 */
async function carregarDados() {
    console.log("Iniciando busca de dados (fetch)...");

    // O 'try' é o nosso "Plano A". Vamos TENTAR buscar os dados.
    try {
        // 1. Faz o pedido (fetch) e ESPERA (await) a resposta.
        const response = await fetch('./dados.json');

        // 2. Se a resposta não for OK (ex: Erro 404, não achou o arquivo),
        // nós mesmos vamos "lançar" um erro para pular para o 'catch'.
        if (!response.ok) {
            throw new Error(`Erro de HTTP: Status ${response.status}`);
        }

        // 3. A resposta chegou (a caixa da pizza).
        //    Vamos ESPERAR (await) ela ser "formatada" de JSON para Objeto JS.
        const dados = await response.json();

        // 4. SUCESSO! Mostra os dados no console.
        console.log("Dados carregados com sucesso:");
        console.log(dados);

    } 
    // O 'catch' é o nosso "Plano B".
    // Se qualquer coisa no 'try' falhar, o código pula para cá.
    catch (error) {
        console.error("Falha ao carregar os dados:", error.message);
        
        // Na Semana 8 (Feedback), vamos mostrar isso para o usuário.
        // Por enquanto, o console é o suficiente.
    }
}