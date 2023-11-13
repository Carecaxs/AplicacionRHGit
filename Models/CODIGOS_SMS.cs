using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models
{
    [Table("CODIGOS_SMS")]
    public class CODIGOS_SMS
    {

        [Key]
        public int id { get; set; }
        public string identificacion { get; set; }
        public string codigo { get; set; }

    }
}
