using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.Expedientes
{
    [Table("REFERENCIAS")]
    public class REFERENCIA
    {
        [Key]
        public int ID_REFERENCIA { get; set; }

        public int ID_EXPEDIENTE { get; set; }
    }
}
