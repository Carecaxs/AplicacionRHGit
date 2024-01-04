using AplicacionRHGit.Models;
using AplicacionRHGit.Models.Dimex;
using AplicacionRHGit.Models.Expedientes;
using AplicacionRHGit.Models.InstitucionesEducativas;
using AplicacionRHGit.Models.OfertasLaborales;
using AplicacionRHGit.Models.Ubicaciones;
using Microsoft.EntityFrameworkCore;
using Proyecto.Models;

namespace AplicacionRHGit.Data
{
    public class ApplicationDbContext : DbContext
    {

        public DbSet<GrupoProfesional> GrupoProfesional { get; set; }
        public DbSet<GradoAcademico> GradoAcademico { get; set; }
        public DbSet<OFERENTE> Oferente { get; set; }
        public DbSet<RECLUTADOR> Reclutador { get; set; }
        public DbSet<CODIGOS_SMS> CodigosSms { get; set; }
        public DbSet<EXPEDIENTE> Expediente { get; set; }
        public DbSet<TITULO> Titulo { get; set; }
        public DbSet<REFERENCIA> Referencia { get; set; }
        public DbSet<DETALLE_TITULO> DetalleTitulo { get; set; }
       
        public DbSet<Idioma> Idioma { get; set; }
        public DbSet<OFERENTE_IDIOMA> OferenteIdioma { get; set; }

        public DbSet<EXPERIENCIA> Experiencia { get; set; }
        public DbSet<DETALLE_REFERENCIAS> DetalleReferencia { get; set; }
        public DbSet<DETALLE_EXPERIENCIA> DetalleExperiencia { get; set; }
        public DbSet<VerificacionDimex> VerificacionDimex { get; set; }
        public DbSet<INSTITUCION> Institucion { get; set; }
        public DbSet<MATERIA> Materia { get; set; }
        public DbSet<Materia_Institucion> Materia_Institucion { get; set; }
        public DbSet<Oferta_Laboral> Oferta_Laboral { get; set; }
        public DbSet<Postulaciones_Oferente> Postulaciones_Oferente { get; set; }
        public DbSet<Oferta_Creada_Oferente> Oferta_Creada_Oferente { get; set; }
        public DbSet<Provincia> Provincia { get; set; }
        public DbSet<Canton> Canton { get; set; }
        public DbSet<CentrosEducativos> CentrosEducativos { get; set; }
        public DbSet<u_universidades> u_universidades { get; set; }
        public DbSet<GrupoProfesionalOferente> GrupoProfesionalOferente { get; set; }
        public DbSet<Ubicaciones_Ofertas_Creadas_Oferentes> Ubicacion_Oferta_Creada_Oferente { get; set; }
        public DbSet<GruposProf_Ofertas_Creadas_Oferentes> GruposProf_Oferta_Creada_Oferente { get; set; }

































        private readonly IConfiguration Configuration;

        public ApplicationDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = Configuration.GetConnectionString("DefaultConnection");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }
    }
}
