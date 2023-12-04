using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.InstitucionesEducativas
{
    [Table("u_parauniversidades")]
    public class u_parauniversidades
    {
        [Key]
        public string id_parauniversidad { get; set; }
        public string nombre_parauniversidad { get; set; }
        public string siglas_parauniversidad { get; set; }

    }
}
