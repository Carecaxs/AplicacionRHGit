using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.Expedientes
{
    [Table("GrupoProfesional")]

    public class GrupoProfesional
    {
        [Key]
        public int idGrupoProfesional { get; set; }
        public string Codigo { get; set; }
        public string grupoProfesional { get; set; }


    }
}
