using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.InstitucionesEducativas
{
    [Table("u_paracarreras")]
    public class u_paracarreras
    {
        [Key]
        public string universidad { get; set; }
        public string grado { get; set; }
        public string nombre_carrera { get; set; }
        public string estado { get; set; }


    }
}
