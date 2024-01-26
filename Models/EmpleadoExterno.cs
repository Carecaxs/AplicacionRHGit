using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models
{
    [Table("EmpleadoExterno")]

    public class EmpleadoExterno
    {
        [Key]
        public int idEmpleadoExterno { get; set; }
        public string identificacion { get; set; }
        public string nombre { get; set; }
        public string apellido1 { get; set; }
        public string apellido2 { get; set; }
        public char genero { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public string telefono { get; set; }
        public string correo { get; set; }
        public int idProvincia { get; set; }
        public int idCanton { get; set; }
        public int idDistrito { get; set; }
        public string direccion { get; set; }
        public string tipoEmpleado { get; set; }
        public bool estado { get; set; }
        public int ID_INSTITUCION { get; set; }




    }
}
