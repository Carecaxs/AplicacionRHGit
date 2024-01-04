using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.Ubicaciones
{
    [Table("Canton")]
    public class Canton
    {

        [Key]
        public int IdCanton { get; set; }
        public string NombreCanton { get; set; }
        public int Provincia { get; set; }
        public int NumeroCanton { get; set; }



    }
}
