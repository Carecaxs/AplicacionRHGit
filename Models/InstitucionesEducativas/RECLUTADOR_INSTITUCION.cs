using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.InstitucionesEducativas
{
    [Table("RECLUTADOR_INSTITUCION")]

    public class RECLUTADOR_INSTITUCION
    {
        [Key]
        public int ID_RECLUTADOR_INSTITUCION { get; set; }
        public int? ID_RECLUTADOR { get; set; }
        public int? ID_INSTITUCION { get; set; }


    }
}
