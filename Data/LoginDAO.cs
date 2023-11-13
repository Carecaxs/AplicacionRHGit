using AplicacionRHGit.Clases;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Proyecto.Models;

namespace AplicacionRHGit.Data
{
    public class LoginDAO
    {

        private readonly ApplicationDbContext _context;

        public LoginDAO(ApplicationDbContext context)
        {
            _context = context;
        }


        public TSE ObtenerDatosPersonaPorCedula(string cedula)
        {

            var persona = _context.TSE.Where(p => p.cedula == cedula).FirstOrDefault();
            
            if (persona != null) { 
                return persona;
            }
            else
            {
                return null;
            }
        }


        public void AgregarUsuario(Usuario usuario, string tipoUsuario)
        {

            if(tipoUsuario == "Oferente") {


                _context.Database.ExecuteSqlRaw("EXEC SP_AGREGAR_OFERENTE @identificacion, @correo, @telefono, @provincia, @canton, @distrito, @direccion",
               new SqlParameter("@identificacion", usuario.identificacion.Replace("-", "").Replace("_", "")),
               new SqlParameter("@correo", usuario.correo),
               new SqlParameter("@telefono", usuario.telefono),
               new SqlParameter("@provincia", usuario.provincia),
               new SqlParameter("@canton", usuario.canton),
               new SqlParameter("@distrito", usuario.distrito),
               new SqlParameter("@direccion", usuario.direccion));

            }
            else
            {

                _context.Database.ExecuteSqlRaw("EXEC SP_AGREGAR_RECLUTADOR @identificacion, @correo, @telefono, @provincia, @canton, @distrito, @direccion",
               new SqlParameter("@identificacion", usuario.identificacion.Replace("-", "").Replace("_", "")),
               new SqlParameter("@correo", usuario.correo),
               new SqlParameter("@telefono", usuario.telefono),
               new SqlParameter("@provincia", usuario.provincia),
               new SqlParameter("@canton", usuario.canton),
               new SqlParameter("@distrito", usuario.distrito),
               new SqlParameter("@direccion", usuario.direccion));
            }
           
        }
    }
}
