using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.Expedientes
{
    [Table("DETALLE_REFERENCIAS")]
    public class DETALLE_REFERENCIAS
    {
        [Key]
        public int ID_DETALLE_REFERENCIA { get; set; }
        public int ID_REFERENCIA { get; set; }
        public char TIPO { get; set; }
        public string? NOMBRE_EMPRESA { get; set; }
        public string NOMBRE_APELLIDOS { get; set; }
        public string CONTACTO { get; set; }
        public bool ESTADO { get; set; }



    }
}
