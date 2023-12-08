using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.Dimex
{
    [Table("VerificacionDimex")]

    public class VerificacionDimex
    {
        [Key]
        public int idVerificacionDimex { get; set; }
        public int idOferente { get; set; }
        public int estado { get; set; }

    }
}
