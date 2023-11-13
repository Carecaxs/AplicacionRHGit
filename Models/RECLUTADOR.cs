using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Proyecto.Models
{
    [Table("RECLUTADORES")]

    public class RECLUTADOR
    {
        [Key]
        public string idOferente { get; set; }
        public string identificacion { get; set; }
        public string correo { get; set; }
        public string telefono { get; set; }
        public string provincia { get; set; }
        public string canton { get; set; }
        public string distrito { get; set; }
        public string direccion { get; set; }
        public string clave { get; set; }
        public bool activo { get; set; }

        public bool verificado { get; set; }
    }
}
