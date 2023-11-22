using AplicacionRHGit.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AplicacionRHGit.Controllers
{
    public class OferenteController : Controller
    {


        private readonly ApplicationDbContext _context;

        public OferenteController(ApplicationDbContext context)
        {
            _context = context;
        }


        public IActionResult MenuPrincipalOferente(string identification, string clave)
        {

            identification = identification.Replace("-", "").Replace("_", "");


            if (!string.IsNullOrEmpty(identification) && !string.IsNullOrEmpty(clave))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Oferente", clave);


                if (persona != null)
                {
                    ViewBag.nombre = persona.nombre;
                    ViewBag.identificacion = persona.identificacion;
                    ViewBag.clave = clave;
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

        public IActionResult DatosPersonalesOferente(string identification, string clave)
        {
            identification = identification.Replace("-", "").Replace("_", "");


            if (!string.IsNullOrEmpty(identification))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Oferente", clave);
                if (persona != null)
                {
                    ViewBag.nombre = persona.nombre;
                    ViewBag.identificacion = identification;
                    ViewBag.apellidos = persona.apellido1 + " " + persona.apellido2;
                    ViewBag.VistaActual = "DatosPersonalesOferente";
                    ViewBag.clave = clave;



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


        public IActionResult TitulosOferente(string identification="0117860836", string clave="123")
        {
            if (!string.IsNullOrEmpty(identification) && !string.IsNullOrEmpty(clave))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Oferente", clave);

                if (persona != null)
                {

                    ViewBag.identificacion = identification;
                    ViewBag.clave = clave;
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



        [HttpGet]
        public JsonResult ObtenerDatosPersonalesEx(string identificacion)
        {
            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);

                var expediente = acceso.ObtenerDatosPersonalesEx(identificacion);
                if(expediente != null)
                {
                    return Json(expediente);

                }
                else
                {
                    return Json(new { error = "Error al cargar expediente" });

                }
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }






        [HttpPost]
        public JsonResult GuardarCambiosDatosPersonalesEx(string identificacion, string nacimiento, string correo, string telefono, int provincia, int canton, int distrito,
            string direccion)
        {
            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);


                if(acceso.GuardarCambiosDatosPersonalesEx(identificacion, nacimiento, correo, telefono, provincia, canton, distrito, direccion) > 0)
                {
                    //si todo sale bien
                    return Json(new { mensaje="Expediente actualizado exitosamente" });
                }
                else
                {
                    return Json(new { error = "Hubo un problema al actualizar el expediente" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }




        //seccion titulos
        [HttpPost]
        public JsonResult GuardarCambiosDatosPersonalesEx(IFormCollection form, string identificacion, string clave)
        {
            // Obtener los valores del formulario
            var nivelEducacion = form["nivelEducacion"];
            var titulo = form["titulo"];
            var institucion = form["institucion"];
            var fechaObtenido = form["fechaObtenido"];
            var folio = form["folio"];
            var asiento = form["asiento"];


            OferentesDAO acceso = new OferentesDAO(_context);

            
            
        }









    }




}
