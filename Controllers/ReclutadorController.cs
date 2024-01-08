using AplicacionRHGit.Data;
using Microsoft.AspNetCore.Mvc;

namespace AplicacionRHGit.Controllers
{
    public class ReclutadorController : Controller
    {


        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor httpContextAccessor;

        public ReclutadorController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            this.httpContextAccessor = httpContextAccessor;
        }

        public IActionResult MenuPrincipalReclutador(string identification = "0117860836", string clave = "123")
        {

            identification = identification.Replace("-", "").Replace("_", "");


            if (!string.IsNullOrEmpty(identification) && !string.IsNullOrEmpty(clave))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Reclutador", clave);


                if (persona != null)
                {
                    ViewBag.nombre = persona.nombre;
                    ViewBag.identificacion = identification;
                    ViewBag.clave = clave;
                    ViewBag.tipoUsuario = "Reclutador";
                    ViewBag.VistaActual = "MenuPrincipalReclutador";




                    return View();
                }
                else
                {
                    return RedirectToAction("MenuPrincipal", "MenuAcceso");


                }
            }
            else
            {

                return RedirectToAction("MenuPrincipal", "MenuAcceso");

            }


        }






        // metodos pagina principal


        //retorna true si ya hay una institucion creada ligada al recludator con la identificacion dada
        [HttpGet]
        public JsonResult InstitucionCreada(string identificacion)
        {
            try
            {

                // Obtener el idOferente usando la identificación
                var idReclutador = _context.Reclutador
                    .Where(r => r.identificacion == identificacion).Select(r=>r.idReclutador)
                    .FirstOrDefault();

                var existe = _context.Reclutador_Institucion.Where(r => r.ID_RECLUTADOR == idReclutador).Any();


                return Json(new { resultado = existe });



            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });


            }

        }

    }
}
