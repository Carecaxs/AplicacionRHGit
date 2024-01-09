using AplicacionRHGit.Data;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

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


        public IActionResult AñadirInstitutoReclutador(string identification = "0117860836", string clave = "123")
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
                    ViewBag.VistaActual = "AñadirInstitutoReclutador";




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
                    .Where(r => r.identificacion == identificacion).Select(r => r.idReclutador)
                    .FirstOrDefault();

                var existe = _context.Reclutador_Institucion.Where(r => r.ID_RECLUTADOR == idReclutador).Any();


                return Json(new { resultado = existe });



            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });


            }

        }



        // metodo para validar la tarjeta de pago
        //[HttpPost]
        //public ActionResult ValidarTarjeta(string numeroTarjeta, string nombreTitular, string fechaExpiracion, string codigoSeguridad)
        //{
        //    try
        //    {
        //        // Configura tu clave secreta de Stripe
        //        StripeConfiguration.ApiKey = "sk_test_51OWSGIKGK9jyxe7xEmaV4hIOpYyp10vMcO1yZ9AcVlqC5vmWSyVdXTA30gHCJbvJN3sKcPDpYZ3NGjDy6tAJiaDZ00K5xq3eK6";

        //        // Crea un PaymentMethod con los detalles de la tarjeta
        //        var paymentMethodCreateOptions = new PaymentMethodCreateOptions
        //        {
        //            Type = "card",
        //            Card = new PaymentMethodCardCreateOptions
        //            {
        //                Number = numeroTarjeta,
        //                ExpiryMonth = fechaExpiracion.Split('/')[0],
        //                ExpiryYear = fechaExpiracion.Split('/')[1],
        //                Cvc = codigoSeguridad,
        //            },
        //        };

        //        var paymentMethodService = new PaymentMethodService();
        //        var paymentMethod = paymentMethodService.Create(paymentMethodCreateOptions);

        //        // La tarjeta es válida
        //        return Json(new { mensaje = "Tarjeta válida", paymentMethodId = paymentMethod.Id });
        //    }
        //    catch (Exception ex)
        //    {
        //        // Maneja errores
        //        return Json(new { mensaje = "Error al validar la tarjeta", error = ex.Message });
        //    }
        //}


        //metodos para la secccion de crear el perfil institucion

        [HttpGet]
        public JsonResult MostrarInstitutosSecundaria(int idProvincia, int idCanton, int idDistrito)
        {

            var instituciones = _context.CentrosEducativos
                           .Where(ce => (idCanton == 0 || ce.Cod_Cant == idCanton) && (idProvincia == 0 || ce.Cod_Pro == idProvincia) && (idDistrito == 0 || ce.Cod_Dist == idDistrito) && ce.Tipo_Ins == 3)
                           .Select(ce => new
                           {
                               codInstitucion = ce.Cod_Presupuestario,
                               nombreInstitucion = ce.Nombre_Institucion
                           })
                           .ToList();



            return Json(instituciones);


        }



        [HttpGet]
        public JsonResult ObtenerTelefonoInstitucion(int idProvincia, int idCanton, int idDistrito, int idInstituto)
        {

            try
            {

                var telefono = _context.CentrosEducativos
                                   .Where(ce => (idCanton == 0 || ce.Cod_Cant == idCanton) && (idProvincia == 0 || ce.Cod_Pro == idProvincia) && (idDistrito == 0 || ce.Cod_Dist == idDistrito)
                                   && ce.Tipo_Ins == 3 && ce.Cod_Presupuestario == idInstituto)
                                   .Select(ce => ce.Num_Tel)
                                   .FirstOrDefault();

                return Json(telefono);



            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }

        }


        [HttpPost]
        public JsonResult AgregarInstitucion(IFormCollection formData)
        {

            try
            {
                ReclutadorDAO acceso = new ReclutadorDAO(_context);

                acceso.AgregarInstitucion(formData);

                return Json(new { exito = true });

            } 

            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }

    }
}
