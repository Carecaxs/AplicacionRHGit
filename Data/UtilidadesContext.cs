using AplicacionRHGit.Models;
using AplicacionRHGit.Models.Expedientes;
using AplicacionRHGit.Models.InstitucionesEducativas;
using Microsoft.EntityFrameworkCore;
using Proyecto.Models;

namespace AplicacionRHGit.Data
{
    public class UtilidadesContext : DbContext
    {

        public DbSet<TSE> TSE { get; set; }
        public DbSet<u_parauniversidades> u_parauniversidades { get; set; }
        public DbSet<u_paracarreras> u_paracarreras { get; set; }
        public DbSet<u_carreras> u_carreras { get; set; }
        public DbSet<u_universidades> u_universidades { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {


                optionsBuilder.UseSqlServer("Data Source=201.237.248.149;Initial Catalog=PracticaUtilidades;User ID=pruebas2016;Password=pruebas2016;TrustServerCertificate=True");
            }
        }
    }
}
