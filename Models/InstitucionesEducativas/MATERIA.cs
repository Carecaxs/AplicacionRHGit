using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.InstitucionesEducativas
{
    [Table("Materias")]

    public class MATERIA
    {
        [Key]
        public int ID_Materia { get; set; }
        public string Nombre { get; set; }

    }
}
