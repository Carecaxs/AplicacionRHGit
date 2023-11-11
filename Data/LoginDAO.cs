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
    }
}
