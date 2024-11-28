describe('Livros Application', () => {
    it('should display livros', () => {
        cy.visit('http://localhost:3000'); // URL do React
        cy.contains('Livros'); // Testa se o título aparece
    });
});
