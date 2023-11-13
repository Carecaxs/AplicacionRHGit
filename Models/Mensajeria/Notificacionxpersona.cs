using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AplicacionRHGit.Models.Mensajeria
{
    public class Notificacionxpersona
    {
        [Key]
        public int id { get; set; }

        public int cod_Notificacion { get; set; }

        public string cedula { get; set; }

        public int? estado { get; set; }

        public int? telefono { get; set; }

        public string tipo_Usuario { get; set; }
    }
}
