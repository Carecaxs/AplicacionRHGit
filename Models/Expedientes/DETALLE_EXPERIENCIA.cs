using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.Expedientes
{

    [Table("DETALLE_EXPERIENCIA")]
    public class DETALLE_EXPERIENCIA
    {
        [Key]
        public int ID_DETALLE_EXPERIENCIA { get; set; }
        public int ID_EXPERIENCIA { get; set; }
        public string NOMBRE_EMPRESA { get; set; }
        public string DESCRIPCION_LABORES { get; set; }
        public int inicio { get; set; }
        public int fin { get; set; }
        public string TELEFONO { get; set; }


    }
}
