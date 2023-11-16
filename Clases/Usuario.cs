using System.ComponentModel.DataAnnotations;

namespace AplicacionRHGit.Clases
{
    public class Usuario
    {
        //modelo para ejecutar sp de creacion de perfiles
        public string identificacion { get; set; }
        public string nombre { get; set; }
        public string apellido1 { get; set; }
        public string apellido2 { get; set; }
        public string correo { get; set; }
        public string telefono { get; set; }

    }
}
