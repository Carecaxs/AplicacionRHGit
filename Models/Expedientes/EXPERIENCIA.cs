using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.Expedientes
{
    [Table("EXPERIENCIA")]
    public class EXPERIENCIA
    {
        [Key]
        public int ID_EXPERIENCIA { get; set; }
        public int ID_EXPEDIENTE { get; set; }

    }
}
