using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend;

namespace E2E.Data
{
    public class E2EContext : DbContext
    {
        public E2EContext(DbContextOptions<E2EContext> options)
            : base(options)
        {
        }

        public DbSet<Backend.Livro> Livro { get; set; } = default!;

        // Configuração do modelo
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurando unicidade no campo Nome
            modelBuilder.Entity<Livro>()
                .HasIndex(l => l.Nome)
                .IsUnique(); // Define que o Nome deve ser único
        }
    }
}