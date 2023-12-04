using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.InstitucionesEducativas
{
    [Table("u_universidades")]
    public class u_universidades
    {
        [Key]
        public string id_universidad { get; set; }
        public string nombre_universidad { get; set; }
        public string siglas_universidad { get; set; }

    }
}
