using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.Expedientes
{
    [Table("TITULOS")]
    public class TITULO
    {

        [Key]
        public int ID_TUTULO { get; set; }

        public int ID_EXPEDIENTE { get; set; }
    }
}
