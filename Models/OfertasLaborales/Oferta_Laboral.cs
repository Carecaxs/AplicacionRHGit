using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.OfertasLaborales
{
    [Table("Ofertas_Laborales")]

    public class Oferta_Laboral
    {

        [Key]
        public int id_oferta { get; set; }
        public string? titulo { get; set; }
        public string? descripcion { get; set; }
        public DateTime? fecha_publicacion { get; set; }
        public bool? estado { get; set; }
        public int? idOferente { get; set; }
        public int? id_institucion { get; set; }
        public int? id_materia { get; set; }
        public int? cantidadVacantes { get; set; }


    }
}
