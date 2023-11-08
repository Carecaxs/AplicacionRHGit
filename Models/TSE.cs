using System.ComponentModel.DataAnnotations;

namespace Proyecto.Models
{
    public class TSE
    {
        [Key]
        public string cedula { get; set; }
        public string fechaNacimiento { get; set; }
        public char genero { get; set; }
        public string? apellido1 { get; set; }
        public string? apellido2 { get; set; }
        public string nombre { get; set; }
        public string? padre { get; set; }
        public string? madre { get; set; }



    }
}
