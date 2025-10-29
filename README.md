# MQS - "Mano Qual é a Sala!?"

## 1. Visão Geral do Projeto

[cite_start]O "MQS" é um Projeto Integrador para a disciplina de Programação Básica para Web [cite: 3] do curso de Tecnologia em Sistemas para Internet (IFTO).

[cite_start]O objetivo é desenvolver uma aplicação web *client-side* (HTML5, CSS3 e JavaScript puro) [cite: 86] que resolve um problema comum dos alunos: a dificuldade em localizar rapidamente os horários e salas de suas disciplinas. [cite_start]A aplicação substituirá a navegação complexa do sistema atual por uma interface simples, rápida e *mobile-first*.

## 2. Funcionalidades Planejadas (Requisitos)

* [cite_start]**Listagem de Horários:** Carregamento dinâmico dos horários a partir de um arquivo `dados.json` local.
* [cite_start]**Filtros Dinâmicos:** Busca por disciplina, período, professor ou sala, sem recarregar a página.
* [cite_start]**Persistência de Tema:** O usuário poderá escolher entre "Modo Claro" e "Modo Escuro", e sua escolha será salva usando `localStorage`.
* **Acessibilidade:** Controles para aumentar e diminuir o tamanho da fonte.
* [cite_start]**Feedback ao Usuário:** Exibição de mensagens de "loading" e "erro" durante o carregamento de dados.
* [cite_start]**Atendimento aos Requisitos Assíncronos:** O projeto utilizará `async/await` para a carga principal e `Promises` (`.then/.catch`) para cargas secundárias.

## 3. Checklist de Conformidade (Documento Guia)

*A ser preenchido conforme o cronograma.*

- [ ] [cite_start]Estruturas básicas (condicionais, laços, funções). [cite: 108]
- [ ] [cite_start]Objetos + Arrays com map/filter/reduce (≥3 métodos). [cite: 109]
- [ ] [cite_start]Arrow functions (incluindo eventos). [cite: 110]
- [ ] [cite_start]DOM dinâmico (criação/remoção/atualização; formulários e eventos). [cite: 111]
- [ ] [cite_start]Requisição assíncrona com fetch + loading/erros. [cite: 112]
- [ ] [cite_start]Promises (.then/.catch) e async/await (try/catch). [cite: 113]
- [ ] [cite_start]Web Storage para persistência. [cite: 114]
- [ ] [cite_start]+1 API HTML5 opcional (File/Geolocation/History/Canvas/Audio/Video/Clipboard). [cite: 115]
- [ ] [cite_start]Responsivo + semântica + acessibilidade básica. [cite: 116]
- [ ] [cite_start]Organização de arquivos e README completo. [cite: 117]