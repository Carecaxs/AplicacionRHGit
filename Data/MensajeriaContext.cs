using AplicacionRHGit.Models.Mensajeria;
using Microsoft.EntityFrameworkCore;


namespace AplicacionRHGit.Data
{
    public class MensajeriaContext : DbContext
    {

        public DbSet<Notificacionxpersona> Notificacionxpersona { get; set; }
        public DbSet<Notificacion> Notificacion { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
        

                optionsBuilder.UseSqlServer("Data Source=;Initial Catalog=;User ID=;Password=;TrustServerCertificate=True");
            }
        }
    }
}
