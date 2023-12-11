using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionRHGit.Models.InstitucionesEducativas
{
    [Table("CentrosEducativos")]
    public class CentrosEducativos
    {
        [Key]
        public int Tipo_Ins { get; set; }


        public int Regional { get; set; }

        public int Circuito { get; set; }

      
        public int Cod_Presupuestario { get; set; }

  
        public string Nombre_Institucion { get; set; }

    
        public int Cod_Pro { get; set; }

 
        public string Prov { get; set; }


        public int Cod_Cant { get; set; }

        public string Canton { get; set; }

     
        public int Cod_Dist { get; set; }

 
        public string Distrito { get; set; }


        public string Pueblo { get; set; }

   
        public string Modalidad { get; set; }


        public string Sector { get; set; }

        public int Num_Tel { get; set; }

    
        public int Red_Cuido1 { get; set; }

 
        public int Preescolar1 { get; set; }


        public int Primaria { get; set; }


        public int Red_Cuido2 { get; set; }

        public int Preescolar2 { get; set; }


        public int Aula_Edad { get; set; }

      
        public int Educ_Especial_Directa1 { get; set; }

    
        public int Educ_Abierta1 { get; set; }

      
        public int Colegio { get; set; }


        public int Educ_Especial_Directa2 { get; set; }

      
        public int Educ_Abierta2 { get; set; }

        public int Educ_Especial_Directa3 { get; set; }

      
        public int Educ_Especial_Directa4 { get; set; }
    }
}
