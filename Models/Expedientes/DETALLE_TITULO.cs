using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.Expedientes
{
    [Table("DETALLE_TITULOS")]

    public class DETALLE_TITULO
    {
        [Key]
        public int ID_DETALLE_TITULOS { get; set; }

        public int ID_TITULO { get; set; }

        public int TIPO_TITULO { get; set; }


        public string NOMBRE_INSTITUCION { get; set; }


        public string ESPECIALIDAD { get; set; }
        public DateTime FECHA_OBTENCION { get; set; }
        public int FOLIO { get; set; }
        public int ASIENTO { get; set; }
        public char ESTADO { get; set; }


    }
}
