using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.OfertasLaborales
{
    [Table("Ubicaciones_Ofertas_Creadas_Oferentes")]

    public class Ubicaciones_Ofertas_Creadas_Oferentes
    {
        [Key]
        public int id { get; set; }
        public int? idCanton { get; set; }
        public int? id_Ofertas_Creadas_Oferentes { get; set; }


    }
}
