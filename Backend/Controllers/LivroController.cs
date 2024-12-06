using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend;
using E2E.Data;
using Backend.Models.dto;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LivroController : ControllerBase
    {
        private readonly E2EContext _context;

        public LivroController(E2EContext context)
        {
            _context = context;
        }

        // GET: api/Livro
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Livro>>> GetLivro()
        {
            return await _context.Livro.ToListAsync();
        }

        // PUT: api/Livro/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]

//Código sem tratamento

//  public async Task<IActionResult> PutLivro(int id, Livro livro)
//         {
//             if (id != livro.Id)
//             {
//                 return BadRequest();
//             }

//             _context.Entry(livro).State = EntityState.Modified;

//             try
//             {
//                 await _context.SaveChangesAsync();
//             }
//             catch (DbUpdateConcurrencyException)
//             {
//                 if (!LivroExists(id))
//                 {
//                     return NotFound();
//                 }
//                 else
//                 {
//                     throw;
//                 }
//             }

//             return NoContent();
//         }


  //Codigo com tratamento      
public async Task<IActionResult> PutLivro(int id, CriarLivroDTO criarLivroDto)
{
    // Verificar se o livro a ser atualizado existe
    var livroExistente = await _context.Livro.FindAsync(id);
    if (livroExistente == null)
    {
        return NotFound($"Livro com ID {id} não encontrado.");
    }

    // Verificar se já existe outro livro com o mesmo nome, mas com ID diferente
    var livroDuplicado = await _context.Livro
        .FirstOrDefaultAsync(l => l.Nome == criarLivroDto.Nome && l.Id != id);

    if (livroDuplicado != null)
    {
        return BadRequest("Já existe um livro cadastrado com este nome.");
    }

    // Atualizando os dados do livro
    livroExistente.Nome = criarLivroDto.Nome;
    livroExistente.Descrição = criarLivroDto.Descrição;

    // Salvando as alterações no banco de dados
    await _context.SaveChangesAsync();

    // Retornando o livro atualizado
    return Ok(livroExistente);
}


        // POST: api/Livro
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]

//    public async Task<ActionResult<Livro>> PostLivro(CriarLivroDTO criarLivroDto)
//      {
    
//     var livro = new Livro
//     {
//         Nome = criarLivroDto.Nome,
//         Descrição = criarLivroDto.Descrição
//     };
    
//     _context.Livro.Add(livro);
//     await _context.SaveChangesAsync();

//     return CreatedAtAction("GetLivro", new { id = livro.Id }, livro);
// }

        public async Task<ActionResult<Livro>> PostLivro(CriarLivroDTO criarLivroDto)
        {
        // Verificar se já existe um livro com o mesmo Nome
        var livroExistente = await _context.Livro
        .FirstOrDefaultAsync(l => l.Nome == criarLivroDto.Nome);

        if (livroExistente != null)
        {
        return BadRequest("Já existe um livro cadastrado com este nome.");
        }

        // Mapeando o DTO para o modelo Livro
        var livro = new Livro
        {
        Nome = criarLivroDto.Nome,
        Descrição = criarLivroDto.Descrição
        };

        // Adicionando o livro ao contexto
        _context.Livro.Add(livro);
        await _context.SaveChangesAsync();

        // Retornando o recurso criado
        return CreatedAtAction("GetLivro", new { id = livro.Id }, livro);
    }



        // DELETE: api/Livro/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLivro(int id)
        {
            var livro = await _context.Livro.FindAsync(id);
            if (livro == null)
            {
                return NotFound();
            }

            _context.Livro.Remove(livro);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LivroExists(int id)
        {
            return _context.Livro.Any(e => e.Id == id);
        }
    }
}
