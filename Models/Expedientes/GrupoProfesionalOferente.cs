using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.Expedientes
{
    [Table("GrupoProfesionalOferente")]
    public class GrupoProfesionalOferente
    {
        [Key]
        public int ID { get; set; }
        public int ID_EXPEDIENTE { get; set; }
        public int id_grupoProfesional { get; set; }


    }
}
