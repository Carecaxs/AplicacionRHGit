using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.Ubicaciones
{
    [Table("Distrito")]
    public class Distrito
    {
        [Key]
        public int IdDistrito { get; set; }
        public string NombreDistrito { get; set; }
        public int Canton { get; set; }
        public int NumeroDistrito { get; set; }


    }
}
