using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models
{
    [Table("EmpleadoOferente")]

    public class EmpleadoOferente
    {
        [Key]
        public int idEmpleadoOferente { get; set; }
        public int idOferente { get; set; }
        public int id_INSTITUCION { get; set; }
        public string tipoEmpleado { get; set; }
        public bool estado { get; set; }


    }
}
