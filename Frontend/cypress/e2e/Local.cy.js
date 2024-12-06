describe('Livros Application', () => {
    // Teste GET para as URLs
    it('should fetch livros from GET /', () => {
        cy.request('GET', 'http://localhost:5273/api/Livro').then((response) => {
            expect(response.status).to.eq(200); // Verifica se a resposta foi bem-sucedida
            expect(response.body).to.be.an('array'); // Verifica se a resposta é um array
        });
    });

    it('should fetch livros from GET /view', () => {
        cy.request('GET', 'http://localhost:5273/api/Livro')
            .then((response) => {
                expect(response.status).to.eq(200); // Status esperado
                expect(response.body).to.be.an('array');
                expect(response.body[0]).to.have.property('id'); // Corrigido para 'id'
            });
    });
    

    // Teste POST para a URL de adicionar
    it('should create a new livro with POST /add', () => {
        const novoLivro = {
            nome: 'Livro Teste10',
            descrição: 'Descrição do Livro Teste'
        };
    
        cy.request({
            method: 'POST',
            url: 'http://localhost:5273/api/Livro',
            body: novoLivro,
            failOnStatusCode: false // Permite capturar respostas de erro
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.nome).to.eq(novoLivro.nome);
            expect(response.body.descrição).to.eq(novoLivro.descrição);
        });
    });
    


    // Teste PUT para editar um livro
    it('should update a livro with PUT /edit', () => {
        const livroEditado = {
            nome: 'Livro Editado1',
            descrição: 'Descrição do Livro Editado'
        };
    
        const livroId = 22; // ID válido de um livro existente
    
        cy.request({
            method: 'PUT',
            url: `http://localhost:5273/api/Livro/${livroId}`,
            body: livroEditado,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.nome).to.eq(livroEditado.nome);
            expect(response.body.descrição).to.eq(livroEditado.descrição);
        });
    });
    


   // Teste DELETE para remover um livro
   it('should delete a livro with DELETE /delete', () => {
    const livroId = 20; // ID válido de um livro existente

    cy.request({
        method: 'DELETE',
        url: `http://localhost:5273/api/Livro/${livroId}`,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(204); // Atualizado para 204
    });
});


});
