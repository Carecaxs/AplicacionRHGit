using AplicacionRHGit.Clases;
using Proyecto.Models;

namespace AplicacionRHGit.Data
{
    public class ConsultasGeneralesDAO
    {

        private readonly ApplicationDbContext _context;

        public ConsultasGeneralesDAO(ApplicationDbContext context)
        {
            _context = context;
        }


        public Usuario ObtenerDatosPersonaPorCedula(string identificacion, string tipoUsuario)
        {
            Usuario usuario = new Usuario();
            if (tipoUsuario == "Oferente")
            {
                var persona= _context.Oferente.Where(p => p.identificacion == identificacion).FirstOrDefault();
                if(persona != null)
                {
                    usuario.identificacion = persona.identificacion;
                    usuario.nombre = persona.nombre;
                    usuario.apellido1 = persona.apellido1;
                    usuario.apellido2 = persona.apellido2; 
                    usuario.correo = persona.correo;
                    usuario.telefono = persona.telefono;
                    return usuario;
                }
            }
            else
            {
                var persona = _context.Reclutador.Where(p => p.identificacion == identificacion).FirstOrDefault();
                if (persona != null)
                {
                    usuario.identificacion = persona.identificacion;
                    usuario.nombre = persona.nombre;
                    usuario.apellido1 = persona.apellido1;
                    usuario.apellido2 = persona.apellido2;
                    usuario.correo = persona.correo;
                    usuario.telefono = persona.telefono;
                    return usuario;

                }

            }
            return null;


        }

    }
}
