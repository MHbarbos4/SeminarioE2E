# Teste Fim a Fim

## Descrição
Este projeto consiste no desenvolvimento de uma aplicação web para gerenciamento de uma livraria. A aplicação foi construída para consumir os quatro métodos principais do protocolo HTTP (GET, POST, PUT e DELETE) através de uma API, permitindo a realização das seguintes funcionalidades:

GET: Listar todos os livros disponíveis na livraria.

POST: Adicionar novos livros à coleção.

PUT: Atualizar informações de livros existentes, como nome do livro e descrição

DELETE: Remover livros do catálogo.

Além de desenvolver a aplicação, como solicitado pelo professor, foi realizado um teste fim a fim (E2E) utilizando a ferramenta Cypress. Esse teste simula o comportamento real do usuário na aplicação para garantir que todas as funcionalidades estão funcionando corretamente.

Destaques do Teste E2E

Verificação da exibição inicial da lista de livros (GET).
Teste da adição de um novo livro ao catálogo (POST).
Simulação da edição de um livro existente (PUT).
Validação da remoção de um livro da lista (DELETE).
Com o Cypress, também foram exploradas boas práticas de automação de testes, garantindo maior confiabilidade no comportamento da aplicação em diferentes cenários.

Este projeto representa um passo importante no aprendizado prático de aplicação de testes automatizados.

---

## O que foi feito
- Desenvolvimento do frontend com React.
- Implementação do backend com .NET.
- Configuração de integração entre frontend e backend.
- Testes end-to-end utilizando Cypress, incluindo validações locais e visuais.

---


## Como executar


### Utilize 3 terminais 
1. Clone o repositório:
   ```bash
   git clone https://github.com/b4rbosa777/SeminarioE2E

2. Entrar no projeto
    ```bash
    cd  SeminarioE2E
    
3. Entrar no backend e ligar 
    ```bash
    cd backend
    dotnet run

4. Entrar no end fronte instalar dependencias e ligar
    ```bash
    cd frontend
    npm install
    npm start
    
5. Rode o cypress visual:
    ```bash
    cd frontend
    npx cypress open

6. Rode o cypress local:
    ```bash
    npx cypress run
