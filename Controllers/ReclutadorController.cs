using AplicacionRHGit.Data;
using AplicacionRHGit.Models.InstitucionesEducativas;
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

        public IActionResult MenuPrincipalReclutador(string identification, string clave)
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
                    return RedirectToAction("MenuAcceso", "MenuPrincipal");


                }
            }
            else
            {
                return RedirectToAction("MenuAcceso", "MenuPrincipal");

            }


        }


        public IActionResult AñadirInstitutoReclutador(string identification, string clave)
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
                    return RedirectToAction("MenuAcceso", "MenuPrincipal");


                }
            }
            else
            {

                return RedirectToAction("MenuAcceso", "MenuPrincipal");

            }


        }


        public IActionResult ModificarInstitutoReclutador(string identification , string clave )
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
                    ViewBag.VistaActual = "ModificarInstitutoReclutador";




                    return View();
                }
                else
                {
                    return RedirectToAction("MenuAcceso", "MenuPrincipal");


                }
            }
            else
            {
                return RedirectToAction("MenuAcceso", "MenuPrincipal");


            }


        }



        public IActionResult AdministrarMateriasReclutador(string identification , string clave)
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
                    ViewBag.VistaActual = "AdministrarMateriasReclutador";




                    return View();
                }
                else
                {
                    return RedirectToAction("MenuAcceso", "MenuPrincipal");



                }
            }
            else
            {

                return RedirectToAction("MenuAcceso", "MenuPrincipal");


            }


        }


        public IActionResult CrearOfertaReclutador(string identification="0117860836", string clave= "123")
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
                    ViewBag.VistaActual = "CrearOfertaReclutador";




                    return View();
                }
                else
                {
                    return RedirectToAction("MenuAcceso", "MenuPrincipal");


                }
            }
            else
            {

                return RedirectToAction("MenuAcceso", "MenuPrincipal");


            }
        }

        public IActionResult VerVacantesReclutador(string identification = "0117860836", string clave = "123")
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
                    ViewBag.VistaActual = "VerVacantesReclutador";




                    return View();
                }
                else
                {
                    return RedirectToAction("MenuAcceso", "MenuPrincipal");


                }
            }
            else
            {

                return RedirectToAction("MenuAcceso", "MenuPrincipal");


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




        //metodos para la secccion de actualizar el perfil institucion

        [HttpGet]
        public JsonResult ObtenerInstitucionReclutador(string identificacion)
        {

            try
            {

                var idReclutador = _context.Reclutador
                                 .Where(r => r.identificacion == identificacion)
                                 .Select(r => r.idReclutador)
                                 .FirstOrDefault();

                var Institucion = (from reclutadorInstitucion in _context.Reclutador_Institucion
                                   where reclutadorInstitucion.ID_RECLUTADOR == idReclutador
                                   join institucion in _context.CentrosEducativos on reclutadorInstitucion.ID_INSTITUCION equals institucion.Cod_Presupuestario
                                   join provincia in _context.Provincia on institucion.Cod_Pro equals provincia.IdProvincia
                                   join canton in _context.Canton on institucion.Cod_Cant equals canton.IdCanton
                                   join distrito in _context.Distrito on institucion.Cod_Dist equals distrito.IdDistrito
                                   select new
                                   {
                                       nombre = institucion.Nombre_Institucion,
                                       contacto = institucion.Num_Tel,
                                       direccion = reclutadorInstitucion.DIRECCION,
                                       provincia = provincia.NombreProvincia,
                                       canton = canton.NombreCanton,
                                       distrito = distrito.NombreDistrito
                                   }).FirstOrDefault();

                if (Institucion != null)
                {
                    return Json(new { instituto = Institucion });

                }
                else
                {
                    return Json(new { vacio = true });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }

        }


        //metodos para la secccion de administrar materias
        [HttpGet]
        public JsonResult MostrarMateriasInstitucion(string identificacion)
        {


            try
            {
                var idReclutador = _context.Reclutador
                                    .Where(r => r.identificacion == identificacion)
                                    .Select(r => r.idReclutador)
                                    .FirstOrDefault();

                var materias = (from reclutadorInstitucion in _context.Reclutador_Institucion
                                where reclutadorInstitucion.ID_RECLUTADOR == idReclutador
                                join materiasInstitucion in _context.Materia_Institucion
                                on reclutadorInstitucion.ID_RECLUTADOR_INSTITUCION equals materiasInstitucion.id_reclutador_institucion
                                join materia in _context.Materia on materiasInstitucion.ID_Materia equals materia.ID_Materia
                                select new
                                {
                                    idMateria = materia.ID_Materia,
                                    nombre = materia.Nombre
                                }).ToList();

                if (materias.Any() && materias != null)
                {
                    return Json(new { materias });

                }
                else
                {
                    return Json(new { vacio = true });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }


        [HttpPost]
        public JsonResult AgregarMateriaInstitucion(int idMateria, string identificacion)
        {


            try
            {

                //consulta el id del oferente con la cedula dada
                var idReclutador = _context.Reclutador
               .Where(o => o.identificacion == identificacion)
               .Select(o => o.idReclutador)
               .FirstOrDefault();

                var idReclutadorInstitucion = _context.Reclutador_Institucion.Where(r => r.ID_RECLUTADOR == idReclutador)
                     .Select(r => r.ID_RECLUTADOR_INSTITUCION).FirstOrDefault();

                if (idReclutadorInstitucion != 0)
                {
                    //significa que este reclutador ya tiene una institucion registrada

                    //se comprueba que el la institucion no tenga registrada esa materia seleccionada
                    var existe = _context.Materia_Institucion.Where(m => m.id_reclutador_institucion == idReclutadorInstitucion && m.ID_Materia==idMateria).Any();

                    if (!existe)
                    {
                        //se agrega la materia a la isntitucion asociada
                        ReclutadorDAO acceso = new ReclutadorDAO(_context);
                        acceso.AgregarMateriaInstitucion(idMateria, idReclutadorInstitucion);
                        return Json(new { exito = true });
                    }
                    else
                    {
                        return Json(new { repetido = true });

                    }


                }
                else
                {
                    //significa que este reclutador aun no tiene una institucion registrada
                    //entonces no se procede con la agregacion de la materia
                    return Json(new { exito = false });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }





        //metodo para eliminar materia
        [HttpDelete]
        public JsonResult EliminarMateriaInstitucion(int idMateria, string identificacion)
        {


            try
            {

                ReclutadorDAO acceso = new ReclutadorDAO(_context);
                acceso.EliminarMateriaInstitucion(idMateria, identificacion);

                return Json(new { exito = true });

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }



        //metodos para la vista de CrearOferta
        [HttpPost]
        public JsonResult CrearOferta(IFormCollection formData)
        {

            try
            {
                ReclutadorDAO acceso = new ReclutadorDAO(_context);

                acceso.CrearOferta(formData);

                return Json(new { exito = true });

            }

            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }


    }
}
