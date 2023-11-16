using Proyecto.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models
{
    [Table("EXPEDIENTES")]

    public class EXPEDIENTE
    {
        [Key]
        public int ID_EXPEDIENTE { get; set; }

        public int idOferente { get; set; }

        public DateTime? nacimiento { get; set; }


        public string provincia { get; set; }


        public string canton { get; set; }

   
        public string distrito { get; set; }


        public string direccion { get; set; }




    }
}
