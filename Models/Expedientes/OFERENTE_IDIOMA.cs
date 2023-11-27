using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.Expedientes
{
    [Table("OferenteIdiomas")]
    public class OFERENTE_IDIOMA
    {
        [Key]
        public int id { get; set; }

        public int ID_EXPEDIENTE { get; set; }

        public int idIdioma { get; set; }


    }
}
