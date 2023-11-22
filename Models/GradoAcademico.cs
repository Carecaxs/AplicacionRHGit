using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models
{
    [Table("GradoAcademico")]

    public class GradoAcademico
    {
        [Key]
        public int id { get; set; }

        public string? gradoAcademico { get; set; }
    }
}
