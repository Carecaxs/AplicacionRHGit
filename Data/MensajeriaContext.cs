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
                optionsBuilder.LogTo(Console.WriteLine);

                optionsBuilder.UseSqlServer("Data Source=201.237.248.149;Initial Catalog=CentroMensajeria;User ID=carlosr;Password=rkrw48uk;TrustServerCertificate=True");
            }
        }
    }
}
