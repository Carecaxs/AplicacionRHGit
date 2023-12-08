using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.InstitucionesEducativas
{
    [Table("Materias_Instituciones")]

    public class Materia_Institucion
    {
        [Key]
        public int ID_MateriaInstitucion { get; set; }
        public int ID_Materia { get; set; }
        public int ID_Institucion { get; set; }

    }
}
