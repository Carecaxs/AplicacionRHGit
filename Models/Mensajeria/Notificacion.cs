using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AplicacionRHGit.Models.Mensajeria
{
    public class Notificacion
    {
        [Key]

        public int cod_Notificacion { get; set; }

        public string ced_Funcionario { get; set; }

        public string asunto { get; set; }

        public string mensaje { get; set; }

        public string cod_Insti { get; set; }

        public int? permiso_Envio { get; set; }

        public DateTime? hora_Creada { get; set; }
 
        public DateTime? hora_Envio { get; set; }

        public string tipo_Usuario { get; set; }
    }
}
