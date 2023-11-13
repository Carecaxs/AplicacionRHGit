using System.ComponentModel.DataAnnotations;

namespace AplicacionRHGit.Models
{
    public class Usuario
    {
        //modelo para ejecutar sp de creacion de perfiles
        public string identificacion { get; set; }
        public string correo { get; set; }
        public string telefono { get; set; }
        public string provincia { get; set; }
        public string canton { get; set; }
        public string distrito { get; set; }
        public string direccion { get; set; }
    }
}
