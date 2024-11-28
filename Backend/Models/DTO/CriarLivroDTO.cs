using Newtonsoft.Json;

namespace Backend.Models.dto
{
    public class CriarLivroDTO
    {
        public required string Nome { get; set; }
        public required string Descrição { get; set; }

        public CriarLivroDTO(string Nome, string Descrição)
        {
            this.Nome = Nome;
            this.Descrição = Descrição;
        }
    }
}
