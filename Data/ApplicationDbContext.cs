using AplicacionRHGit.Models;
using AplicacionRHGit.Models.Expedientes;
using Microsoft.EntityFrameworkCore;
using Proyecto.Models;

namespace AplicacionRHGit.Data
{
    public class ApplicationDbContext : DbContext
    {

        public DbSet<TSE> TSE { get; set; }
        public DbSet<OFERENTE> Oferente { get; set; }
        public DbSet<RECLUTADOR> Reclutador { get; set; }
        public DbSet<CODIGOS_SMS> CodigosSms { get; set; }
        public DbSet<EXPEDIENTE> Expediente { get; set; }
        public DbSet<TITULO> Titulo { get; set; }
        public DbSet<REFERENCIA> Referencia { get; set; }
        public DbSet<DETALLE_TITULO> DetalleTitulo { get; set; }
        public DbSet<GradoAcademico> GradoAcademico { get; set; }









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
