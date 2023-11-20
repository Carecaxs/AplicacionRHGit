using AplicacionRHGit.Data;
using Microsoft.AspNetCore.Mvc;

namespace AplicacionRHGit.Controllers
{
    public class OferenteController : Controller
    {


        private readonly ApplicationDbContext _context;

        public OferenteController(ApplicationDbContext context)
        {
            _context = context;
        }


        public IActionResult MenuPrincipalOferente(string identification)
        {

            identification = identification.Replace("-", "").Replace("_", "");


            if (!string.IsNullOrEmpty(identification))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Oferente");


                if (persona != null)
                {
                    ViewBag.nombre = persona.nombre;
                    ViewBag.identificacion = persona.identificacion;
                    ViewBag.tipoUsuario = "Oferente";


                    return View();
                }
                else
                {
                    return NotFound();

                }
            }
            else
            {
                return NotFound();

            }


        }


    }
}
