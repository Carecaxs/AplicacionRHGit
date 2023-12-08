using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.InstitucionesEducativas
{
    [Table("INSTITUCIONES")]

    public class INSTITUCION
    {
        [Key]
        public int ID_INSTITUCION { get; set; }
        public string NOMBRE { get; set; }
        public string TELEFONO { get; set; }
        public int IdProvincia { get; set; }
        public int IdCanton { get; set; }
        public int IdDistrito { get; set; }
        public string DIRECCION { get; set; }


    }
}
