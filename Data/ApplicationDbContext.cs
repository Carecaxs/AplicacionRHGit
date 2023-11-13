using Microsoft.EntityFrameworkCore;
using Proyecto.Models;

namespace AplicacionRHGit.Data
{
    public class ApplicationDbContext : DbContext
    {

        public DbSet<TSE> TSE { get; set; }
        public DbSet<OFERENTE> Oferente { get; set; }
        public DbSet<RECLUTADOR> Reclutador { get; set; }



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
