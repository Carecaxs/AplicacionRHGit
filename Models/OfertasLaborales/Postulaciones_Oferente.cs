using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.OfertasLaborales
{
    [Table("Postulaciones_Oferente")]

    public class Postulaciones_Oferente
    {
        [Key]
        public int id { get; set; }
        public int? id_oferta { get; set; }
        public int? idOferente { get; set; }
        public bool? estado { get; set; }


    }
}
