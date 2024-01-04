using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AplicacionRHGit.Models.Ubicaciones
{
    [Table("Provincia")]
    public class Provincia
    {

        [Key]
        public int IdProvincia { get; set; }
        public string NombreProvincia { get; set; }
        public int NumeroProvincia { get; set; }



    }
}
