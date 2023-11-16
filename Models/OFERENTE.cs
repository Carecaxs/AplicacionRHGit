using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Proyecto.Models
{
    [Table("OFERENTES")]

    public class OFERENTE
    {
        [Key]
        public int idOferente { get; set; }
        public string identificacion { get; set; }
        public string nombre { get; set; }
        public string apellido1 { get; set; }
        public string apellido2 { get; set; }
        public string correo { get; set; }
        public string telefono { get; set; }
        public string clave { get; set; }
        public bool activo { get; set; }

        public bool verificado { get; set; }


    }
}
