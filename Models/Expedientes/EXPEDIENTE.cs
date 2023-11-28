using Proyecto.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.Expedientes
{
    [Table("EXPEDIENTES")]

    public class EXPEDIENTE
    {
        [Key]
        public int ID_EXPEDIENTE { get; set; }

        public int? idOferente { get; set; }

        public DateTime? nacimiento { get; set; }


        public int? IdProvincia { get; set; }


        public int? IdCanton { get; set; }


        public int? IdDistrito { get; set; }

        public string? direccion { get; set; }

        public int? genero { get; set; }
        public int? grupoProfesional { get; set; }







    }
}
