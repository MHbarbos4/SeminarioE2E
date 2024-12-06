const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.js",  // Ajuste o caminho conforme sua estrutura de pastas
    setupNodeEvents(on, config) {
      // implemente os ouvintes de eventos do nó aqui
    },
  },
});
