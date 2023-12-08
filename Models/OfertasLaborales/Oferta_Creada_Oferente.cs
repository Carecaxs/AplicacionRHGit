using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.OfertasLaborales
{
    [Table("Ofertas_Creadas_Oferentes")]
    public class Oferta_Creada_Oferente
    {
        [Key]
        public int id { get; set; }
        public string? descripcion { get; set; }
        public DateTime? fecha_publicacion { get; set; }
        public bool? estado { get; set; }
        public int? idOferente { get; set; }
        public int? IdProvincia { get; set; }
        public int? IdCanton { get; set; }


    }
}
