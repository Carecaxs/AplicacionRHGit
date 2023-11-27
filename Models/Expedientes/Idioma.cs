using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.Expedientes
{
    [Table("Idiomas")]

    public class Idioma
    {
        [Key]
        public int idIdioma { get; set; }
        public string NombreIdioma { get; set; }

    }
}
