using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.OfertasLaborales
{
    [Table("Materias_Ofertas_Creadas_Oferentes")]

    public class Materia_Oferta_Creada_Oferente
    {
        [Key]
        public int id { get; set; }
        public int? ID_Materia { get; set; }
        public int? id_Ofertas_Creadas_Oferentes { get; set; }


    }
}
