using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.OfertasLaborales
{
    [Table("GruposProf_Ofertas_Creadas_Oferentes")]

    public class GruposProf_Ofertas_Creadas_Oferentes
    {
        [Key]
        public int id { get; set; }
        public int? idGrupoProf { get; set; }
        public int? id_Ofertas_Creadas_Oferentes { get; set; }


    }
}
