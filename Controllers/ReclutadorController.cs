using AplicacionRHGit.Data;
using AplicacionRHGit.Models;
using AplicacionRHGit.Models.Expedientes;
using AplicacionRHGit.Models.InstitucionesEducativas;
using AplicacionRHGit.Models.Ubicaciones;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Stripe;
using Stripe.Checkout;
using System.Drawing.Drawing2D;

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


        public IActionResult ModificarInstitutoReclutador(string identification, string clave)
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



        public IActionResult AdministrarMateriasReclutador(string identification, string clave)
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


        public IActionResult CrearOfertaReclutador(string identification, string clave)
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

        public IActionResult VerVacantesReclutador(string identification, string clave)
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


        public IActionResult AdministrarOfertasReclutador(string identification, string clave)
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
                    ViewBag.VistaActual = "AdministrarOfertasReclutador";




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



        public IActionResult VerCandidatosReclutador(string identification = "0117860836", string clave = "123", int idOferta = 0)
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
                    ViewBag.VistaActual = "VerCandidatosReclutador";
                    ViewBag.idOferta = idOferta;

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

        public IActionResult AgregarEditarEmpleado(string identification = "0117860836", string clave = "123")
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
                    ViewBag.VistaActual = "AgregarEditarEmpleado";

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


        public IActionResult ExpedientesEmpleado(string identification = "0117860836", string clave = "123")
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
                    ViewBag.VistaActual = "ExpedientesEmpleado";

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
                    var existe = _context.Materia_Institucion.Where(m => m.id_reclutador_institucion == idReclutadorInstitucion && m.ID_Materia == idMateria).Any();

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


        //metodos para la vista VerVacantesReclutador

        //este metodo carga la vacantes del reclutador
        //recibe la identificacion del reclutador 
        //recibe 1 si quiere mostrar las activas o 2 si todas, 3 si es por parametros
        [HttpGet]
        public JsonResult CargarMisVacantes(string identification, int num, int provincia, int canton, int idMateria, int horario)
        {
            try
            {
                var idReclutador = _context.Reclutador
                          .Where(o => o.identificacion == identification)
                          .Select(o => o.idReclutador)
                          .FirstOrDefault();

                var consulta = from oferta in _context.Oferta_Laboral
                               join institucion in _context.Reclutador_Institucion on oferta.id_reclutador_institucion equals institucion.ID_RECLUTADOR_INSTITUCION
                               join centroEducativo in _context.CentrosEducativos on institucion.ID_INSTITUCION equals centroEducativo.Cod_Presupuestario
                               join materia in _context.Materia on oferta.id_materia equals materia.ID_Materia

                               where (num == 2 || oferta.estado == false) &&
                                     (num != 3 || oferta.horario == 1 && oferta.horario == 2) &&
                                     (provincia == 0 || centroEducativo.Cod_Pro == provincia) &&
                                     (canton == 0 || centroEducativo.Cod_Cant == canton) &&
                                     (idMateria == 0 || oferta.id_materia == idMateria) &&
                                     (horario == -1 || horario == 0 || oferta.horario == horario) &&
                                     (oferta.cantidadVacantes > 0) &&
                                     (institucion.ID_RECLUTADOR == idReclutador)

                               orderby oferta.fecha_publicacion descending  // Ordenar por fecha de publicación de mayor a menor
                               select new
                               {
                                   idOferta = oferta.id_oferta,
                                   nombreOferta = oferta.titulo,
                                   descripcionOferta = oferta.descripcion,
                                   publicacionOferta = oferta.fecha_publicacion,
                                   nombreInstitucion = centroEducativo.Nombre_Institucion,
                                   nombreMateria = materia.Nombre
                               };


                if (consulta != null && consulta.Any())
                {
                    return Json(consulta);

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


        //metodos para la vista AdministrarOfertasReclutador

        [HttpDelete]
        public JsonResult EliminarVacante(int idOferta)
        {
            try
            {
                var oferta = _context.Oferta_Laboral.SingleOrDefault(o => o.id_oferta == idOferta);
                _context.Oferta_Laboral.Remove(oferta);
                _context.SaveChanges();
                return Json(new { exito = true });

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }

        }

        [HttpPut]
        public JsonResult ActualizarOferta(string titulo, string descripcion, int cantidadVacantes, int idOferta, int horario)
        {

            try
            {
                ReclutadorDAO acceso = new ReclutadorDAO(_context);

                acceso.ActualizarOferta(titulo, descripcion, cantidadVacantes, idOferta, horario);

                return Json(new { exito = true });

            }

            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }



        [HttpGet]
        public JsonResult CargarListaCandidatosPostulados(int idOferta)
        {

            try
            {
                //candidatos que se postulan directamente
                var candidatos = (from oferta in _context.Postulaciones_Oferente
                                  where oferta.id_oferta == idOferta
                                  join oferente in _context.Oferente on oferta.idOferente equals oferente.idOferente
                                  select new
                                  {
                                      idOferente = oferente.idOferente,
                                      nombre = oferente.nombre + " " + oferente.apellido1 + " " + oferente.apellido2
                                  }).ToList();

                if (candidatos.Any())
                {

                    return Json(new { candidatos });
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

        [HttpGet]
        public JsonResult CargarListaCandidatosSugeridos(int idOferta)
        {

            try
            {

                //candidatos que no se postulan directamente pero crean una oferta y
                //esta coincide con la oferta del reclutador
                var ofertaLaboral = (from o in _context.Oferta_Laboral
                                     join
                                   unionInstitucion in _context.Reclutador_Institucion
                                   on o.id_reclutador_institucion equals unionInstitucion.ID_RECLUTADOR_INSTITUCION
                                     join institucion in _context.CentrosEducativos on
                                     unionInstitucion.ID_INSTITUCION equals institucion.Cod_Presupuestario
                                     join materia in _context.Materia on o.id_materia equals materia.ID_Materia
                                     where o.id_oferta == idOferta
                                     select new
                                     {
                                         materia = materia.ID_Materia,
                                         idCanton = institucion.Cod_Cant,
                                         o.horario
                                     }).SingleOrDefault();

                var candidatos = (from ofertasOferente in _context.Oferta_Creada_Oferente
                                  join oferente in _context.Oferente
                                  on ofertasOferente.idOferente equals oferente.idOferente
                                  join ubicacionOfertaOferente in _context.Ubicacion_Oferta_Creada_Oferente
                                  on ofertasOferente.id equals ubicacionOfertaOferente.id_Ofertas_Creadas_Oferentes
                                  where ubicacionOfertaOferente.idCanton == ofertaLaboral.idCanton &&
                                  ofertasOferente.id_Materia == ofertaLaboral.materia &&
                                  (ofertasOferente.horario == 0 || ofertasOferente.horario == ofertaLaboral.horario)
                                  && !(
                                    from postulacion in _context.Postulaciones_Oferente
                                    where postulacion.idOferente == oferente.idOferente
                                    select postulacion
                                  ).Any()
                                  select new
                                  {
                                      idOferente = oferente.idOferente,
                                      nombre = oferente.nombre + " " + oferente.apellido1 + " " + oferente.apellido2
                                  }).ToList();


                if (candidatos.Any())
                {

                    return Json(new { candidatos });
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



        [HttpGet]
        public JsonResult ObtenerDatosPersonalesOferente(int idOferente)
        {
            try
            {



                var expediente = (from e in _context.Expediente
                                  where e.idOferente == idOferente
                                  join o in _context.Oferente on
                                  e.idOferente equals o.idOferente
                                  join p in _context.Provincia on
                                  e.IdProvincia equals p.IdProvincia
                                  join c in _context.Canton on
                                  e.IdCanton equals c.IdCanton
                                  join d in _context.Distrito on
                                  e.IdDistrito equals d.IdDistrito
                                  select new
                                  {
                                      nombreProvincia = p.NombreProvincia,
                                      nombreCanton = c.NombreCanton,
                                      nombreDistrito = d.NombreDistrito,
                                      e,
                                      o
                                  }).SingleOrDefault();


                if (expediente != null)
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


        [HttpGet]
        public JsonResult MostrarIdiomasOferente(int idOferente)
        {

            //consulta el id del expediente de ese oferente
            var idExpediente = _context.Expediente
            .Where(e => e.idOferente == idOferente)
            .Select(e => e.ID_EXPEDIENTE)
            .FirstOrDefault();



            var idioma = (from oi in _context.OferenteIdioma
                          join i in _context.Idioma on oi.idIdioma equals i.idIdioma
                          where oi.ID_EXPEDIENTE == idExpediente
                          select i).ToList();

            try
            {

                if (idioma != null)
                {
                    return Json(idioma);

                }
                else
                {
                    return Json(new { error = true });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }



        [HttpGet]
        public JsonResult CargarGrupoProfesionalOferente(int idOferente)
        {
            //consulta el id del expediente de ese oferente
            var idExpediente = _context.Expediente
            .Where(e => e.idOferente == idOferente)
            .Select(e => e.ID_EXPEDIENTE)
            .FirstOrDefault();



            var grupos = (from gpo in _context.GrupoProfesionalOferente
                          join g in _context.GrupoProfesional on gpo.id_grupoProfesional equals g.idGrupoProfesional
                          where gpo.ID_EXPEDIENTE == idExpediente
                          select g).ToList();

            try
            {

                if (grupos != null && grupos.Any())
                {
                    return Json(grupos);
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


        [HttpGet]
        public JsonResult ObtenerUrlImagen(int idOferente)
        {

            try
            {
                var identificacion = _context.Oferente.Where(o => o.idOferente == idOferente).Select(o => o.identificacion).SingleOrDefault().Trim();
                var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
                var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesPerfilExpediente", identificacion);


                // Buscar el archivo en el directorio
                string[] archivos = Directory.GetFiles(carpetaCedula, "fotoPerfil.*");

                if (archivos.Length > 0 && System.IO.File.Exists(archivos[0]))
                {
                    // Obtener la URL relativa al archivo
                    var rutaRelativa = Path.Combine("ImagesPerfilExpediente", identificacion, Path.GetFileName(archivos[0]));
                    var urlImagen = Url.Content("~/" + rutaRelativa);

                    // Ahora, urlImagen contiene la URL completa del archivo

                    return Json(new { urlImagen });


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



        [HttpGet]
        public JsonResult CargarReferencias(int idOferente, char tipoReferencia)
        {
            try
            {

                //consulta el id del expediente de ese oferente
                var idExpediente = _context.Expediente
                .Where(e => e.idOferente == idOferente)
                .Select(e => e.ID_EXPEDIENTE)
                .FirstOrDefault();

                //consulta el id de la referencia donde contenga ese id de expediente
                var idReferencia = _context.Referencia
                .Where(r => r.ID_EXPEDIENTE == idExpediente)
                .Select(r => r.ID_REFERENCIA)
                .FirstOrDefault();

                //filtrar en una lista los titulos por id
                List<DETALLE_REFERENCIAS> referencias = _context.DetalleReferencia
                .Where(r => r.ID_REFERENCIA == idReferencia && r.TIPO == tipoReferencia)
                .ToList();

                if (referencias != null && referencias.Any())
                {
                    return Json(referencias);
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


        [HttpGet]
        public JsonResult ObtenerUrlEvaluacion(int idOferente, int idReferencia)
        {

            try
            {
                var identificacion = _context.Oferente.Where(o => o.idOferente == idOferente).Select(o => o.identificacion).SingleOrDefault().Trim();

                var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
                var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesReferencias", identificacion);


                // Buscar el archivo en el directorio
                string[] archivos = Directory.GetFiles(carpetaCedula, idReferencia + ".*");

                if (archivos.Length > 0 && System.IO.File.Exists(archivos[0]))
                {
                    // Obtener la URL relativa al archivo
                    var rutaRelativa = Path.Combine("ImagesReferencias", identificacion, Path.GetFileName(archivos[0]));
                    var urlImagen = Url.Content("~/" + rutaRelativa);

                    // Ahora, urlImagen contiene la URL completa del archivo

                    return Json(new { urlImagen });


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


        [HttpGet]
        public JsonResult CargarTitulos(int idOferente, int tipo)
        {


            var idExpediente = _context.Expediente
                .Where(e => e.idOferente == idOferente)
                .Select(e => e.ID_EXPEDIENTE)
                .FirstOrDefault();

            var idTitulo = _context.Titulo
                .Where(t => t.ID_EXPEDIENTE == idExpediente)
                .Select(t => t.ID_TITULO)
                .FirstOrDefault();


            switch (tipo)
            {
                case 1:
                    //consulta para secundaria
                    var titulos = (from detalleTitulo in _context.DetalleTitulo
                                   join institucion in _context.CentrosEducativos on detalleTitulo.ID_INSTITUCION equals institucion.Cod_Presupuestario
                                   join grado in _context.GradoAcademico on detalleTitulo.TIPO_TITULO equals grado.id
                                   where detalleTitulo.TIPO_TITULO == 1 && detalleTitulo.ID_TITULO == idTitulo
                                   select new
                                   {
                                       idDetalleTitulo = detalleTitulo.ID_DETALLE_TITULOS,
                                       idTitulo = detalleTitulo.ID_TITULO,
                                       especialidad = detalleTitulo.ESPECIALIDAD,
                                       folio = detalleTitulo.FOLIO,
                                       asiento = detalleTitulo.ASIENTO,
                                       estado = detalleTitulo.ESTADO,
                                       tipoTitulo = grado.gradoAcademico,
                                       fechaInicio = detalleTitulo.FECHA_INICIO,
                                       fechaFin = detalleTitulo.FECHA_FIN,
                                       tomo = detalleTitulo.TOMO,
                                       institucion = institucion.Nombre_Institucion,
                                       codPrespuestario = institucion.Cod_Presupuestario
                                   })
                   .GroupBy(t => t.codPrespuestario) // Agrupar por Cod_Presupuestario
                   .Select(group => group.First()) // Seleccionar el primer elemento de cada grupo
                   .ToList();


                    if (titulos != null && titulos.Any())
                    {
                        return Json(titulos);
                    }
                    else
                    {
                        return Json(new { vacio = true });

                    }


                case 2:


                    //consulta para universidades
                    var titulo = (from detalleTitulo in _context.DetalleTitulo
                                  join grado in _context.GradoAcademico on detalleTitulo.TIPO_TITULO equals grado.id
                                  join institutos in _context.u_universidades on detalleTitulo.ID_INSTITUCION.ToString() equals institutos.id_universidad
                                  where (detalleTitulo.TIPO_TITULO == 3 || detalleTitulo.TIPO_TITULO == 4 ||
                                         detalleTitulo.TIPO_TITULO == 5 || detalleTitulo.TIPO_TITULO == 6 || detalleTitulo.TIPO_TITULO == 7
                                         && detalleTitulo.ID_TITULO == idTitulo)
                                  select new
                                  {
                                      idDetalleTitulo = detalleTitulo.ID_DETALLE_TITULOS,
                                      idTitulo = detalleTitulo.ID_TITULO,
                                      especialidad = detalleTitulo.ESPECIALIDAD,
                                      folio = detalleTitulo.FOLIO,
                                      asiento = detalleTitulo.ASIENTO,
                                      estado = detalleTitulo.ESTADO,
                                      tipoTitulo = grado.gradoAcademico,
                                      fechaInicio = detalleTitulo.FECHA_INICIO,
                                      fechaFin = detalleTitulo.FECHA_FIN,
                                      tomo = detalleTitulo.TOMO,
                                      institucion = institutos.nombre_universidad
                                  }).ToList();



                    if (titulo != null && titulo.Any())
                    {
                        return Json(titulo);
                    }
                    else
                    {
                        return Json(new { vacio = true });

                    }

                case 3:
                    //consulta para diplomados
                    var tituloVarios = (from detalleTitulo in _context.DetalleTitulo
                                        join grado in _context.GradoAcademico on detalleTitulo.TIPO_TITULO equals grado.id
                                        join institutos in _context.u_universidades on detalleTitulo.ID_INSTITUCION.ToString() equals institutos.id_universidad
                                        where (detalleTitulo.TIPO_TITULO == 2 && detalleTitulo.ID_TITULO == idTitulo)
                                        select new
                                        {
                                            idDetalleTitulo = detalleTitulo.ID_DETALLE_TITULOS,
                                            idTitulo = detalleTitulo.ID_TITULO,
                                            especialidad = detalleTitulo.ESPECIALIDAD,
                                            folio = detalleTitulo.FOLIO,
                                            asiento = detalleTitulo.ASIENTO,
                                            estado = detalleTitulo.ESTADO,
                                            tipoTitulo = grado.gradoAcademico,
                                            fechaInicio = detalleTitulo.FECHA_INICIO,
                                            fechaFin = detalleTitulo.FECHA_FIN,
                                            tomo = detalleTitulo.TOMO,
                                            institucion = institutos.nombre_universidad
                                        }).ToList();



                    if (tituloVarios != null && tituloVarios.Any())
                    {
                        return Json(tituloVarios);
                    }
                    else
                    {
                        return Json(new { vacio = true });

                    }
            }



            return Json(new { vacio = true });



        }

        [HttpGet]
        public JsonResult CargarTituloEspecifico(int idTitulo)
        {

            try
            {
                var titulo = _context.DetalleTitulo.Where(t => t.ID_DETALLE_TITULOS == idTitulo).SingleOrDefault();


                return Json(titulo);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }

        [HttpGet]
        public JsonResult ObtenerUrlTitulo(int idOferente, int idTitulo)
        {

            try
            {
                var identificacion = _context.Oferente.Where(o => o.idOferente == idOferente).Select(o => o.identificacion).SingleOrDefault().Trim();
                var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
                var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesTitulos", identificacion);


                // Buscar el archivo en el directorio
                string[] archivos = Directory.GetFiles(carpetaCedula, idTitulo + ".*");

                if (archivos.Length > 0 && System.IO.File.Exists(archivos[0]))
                {
                    // Obtener la URL relativa al archivo
                    var rutaRelativa = Path.Combine("ImagesTitulos", identificacion, Path.GetFileName(archivos[0]));
                    var urlImagen = Url.Content("~/" + rutaRelativa);

                    // Ahora, urlImagen contiene la URL completa del archivo

                    return Json(new { urlImagen });


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

        [HttpGet]
        public JsonResult CargarExperiencias(int idOferente)
        {
            try
            {
                //consulta el id del expediente de ese oferente
                var idExpediente = _context.Expediente
                .Where(e => e.idOferente == idOferente)
                .Select(e => e.ID_EXPEDIENTE)
                .FirstOrDefault();

                //consulta el id de la experiencia
                var idExperiencia = _context.Experiencia
                .Where(e => e.ID_EXPEDIENTE == idExpediente)
                .Select(e => e.ID_EXPERIENCIA)
                .FirstOrDefault();

                //filtrar en una lista los experiencias por id
                List<DETALLE_EXPERIENCIA> experiencias = _context.DetalleExperiencia
                .Where(e => e.ID_EXPERIENCIA == idExperiencia)
                .OrderByDescending(e => e.fin)
                .ToList();

                if (experiencias != null)
                {
                    return Json(experiencias);
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


        [HttpGet]
        public JsonResult ObtenerUrlExperiencia(int idOferente, int idExperiencia)
        {

            try
            {
                var identificacion = _context.Oferente.Where(o => o.idOferente == idOferente).Select(o => o.identificacion).SingleOrDefault().Trim();
                var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
                var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesEvaluaciones", identificacion);


                // Buscar el archivo en el directorio
                string[] archivos = Directory.GetFiles(carpetaCedula, idExperiencia + ".*");

                if (archivos.Length > 0 && System.IO.File.Exists(archivos[0]))
                {
                    // Obtener la URL relativa al archivo
                    var rutaRelativa = Path.Combine("ImagesEvaluaciones", identificacion, Path.GetFileName(archivos[0]));
                    var urlImagen = Url.Content("~/" + rutaRelativa);

                    // Ahora, urlImagen contiene la URL completa del archivo

                    return Json(new { urlImagen });


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



        // metodos seccion AgregarEditarEmpleados

        [HttpGet]
        public JsonResult GetEmpleado(string identificacion, string identificacionReclutador)
        {



            identificacion = identificacion.Replace("-", "").Replace("_", "");


            try
            {
                var idReclutador = _context.Reclutador
                  .Where(o => o.identificacion == identificacionReclutador.Replace("-", ""))
                  .Select(o => o.idReclutador)
                  .FirstOrDefault();

                var idInstitucion = _context.Reclutador_Institucion
                    .Where(r => r.ID_RECLUTADOR == idReclutador)
                    .Select(r => r.ID_INSTITUCION)
                    .SingleOrDefault();

                var empleado = _context.EmpleadoExterno.SingleOrDefault(e => e.identificacion == identificacion && e.ID_INSTITUCION.Equals(idInstitucion));
                if (empleado != null)
                {

                    return Json(empleado);
                }
                else
                {
                    return Json(new { vacio = true });

                }

            }
            catch (SqlException sqlEx)
            {
                // Manejo de excepciones de SQL Server
                return Json(new { error = "Error en la base de datos: " + sqlEx.Message });
            }
            catch (Exception ex)
            {
                // Manejo de otras excepciones
                return Json(new { error = "Error desconocido: " + ex.Message });
            }


        }

        [HttpGet]
        public JsonResult GetPersona(string identificacion)
        {



            if (identificacion != null && identificacion != "")
            {



                identificacion = identificacion.Replace("-", "").Replace("_", "");

                try
                {

                    LoginDAO DA = new LoginDAO(_context);
                    var persona = DA.ObtenerDatosPersonaPorCedula(identificacion);

                    if (persona != null)
                    {

                        return Json(persona);
                    }
                    else
                    {
                        return Json(new { vacio = true });
                    }

                }
                catch (SqlException sqlEx)
                {
                    // Manejo de excepciones de SQL Server
                    return Json(new { error = "Error en la base de datos: " + sqlEx.Message });
                }
                catch (Exception ex)
                {
                    // Manejo de otras excepciones
                    return Json(new { error = "Error desconocido: " + ex.Message });
                }
            }
            else
            {

                return Json(new { error = "Debes de ingresar la cédula" });
            }

        }


        [HttpPost]
        public JsonResult AgregarEmpleado(IFormCollection formData)
        {

            try
            {

                var idReclutador = _context.Reclutador
                 .Where(o => o.identificacion == formData["identificacionReclutador"].FirstOrDefault().Replace("-", ""))
                 .Select(o => o.idReclutador)
                 .FirstOrDefault();

                var idInstitucion = _context.Reclutador_Institucion
                    .Where(r => r.ID_RECLUTADOR == idReclutador)
                    .Select(r => r.ID_INSTITUCION)
                    .SingleOrDefault();

                string identificacionEmpleado = formData["identificacion"].FirstOrDefault().Replace("-", "");


                //se comprueba si ya existe el usuario 
                var existeEmpleadoExterno = _context.EmpleadoExterno
                                .Where(e => e.identificacion == identificacionEmpleado && e.ID_INSTITUCION.Equals(idInstitucion))
                                .Any();


                var idOferente = _context.Oferente
                       .Where(o => o.identificacion == formData["identificacion"].FirstOrDefault().Replace("-", ""))
                       .Select(o => o.idOferente)
                       .FirstOrDefault();

                var existeEmpleadoOferente = _context.EmpleadoOferente
                    .Where(e => e.idOferente.Equals(idOferente) && e.id_INSTITUCION.Equals(idInstitucion))
                    .Any();

                //si no existe el empleado se agrega
                if (!existeEmpleadoExterno && !existeEmpleadoOferente)
                {
                    ReclutadorDAO acceso = new ReclutadorDAO(_context);

                    acceso.AgregarEmpleado(formData);

                    return Json(new { exito = true });
                }
                else
                {
                    return Json(new { existe = "Empleado ya existe" });
                }

            }

            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }


        [HttpPut]
        public JsonResult EditarEmpleado(IFormCollection formData)
        {

            try
            {

                ReclutadorDAO acceso = new ReclutadorDAO(_context);

                acceso.EditarEmpleado(formData);

                return Json(new { exito = true });

            }

            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }


        //metodos seccion expedientesEmpleado
        public JsonResult GetEmpleadosListaGeneral(string identificacionReclutador)
        {
            try
            {
                var idReclutador = _context.Reclutador
                    .Where(o => o.identificacion == identificacionReclutador.Replace("-", ""))
                    .Select(o => o.idReclutador)
                    .FirstOrDefault();

                var idInstitucion = _context.Reclutador_Institucion
                    .Where(r => r.ID_RECLUTADOR == idReclutador)
                    .Select(r => r.ID_INSTITUCION)
                    .SingleOrDefault();

                var empleadoExterno = _context.EmpleadoExterno.Where(e => e.ID_INSTITUCION.Equals(idInstitucion))
                      .Select(e => new
                      {
                          id = e.idEmpleadoExterno,
                          identificacion=e.identificacion
                      })
                    .ToList();

                var empleadoOferente = (from empleado in _context.EmpleadoOferente where empleado.id_INSTITUCION == idInstitucion
                                        join oferente in _context.Oferente on empleado.idOferente equals oferente.idOferente
                                        select new
                                        {
                                            id=empleado.idEmpleadoOferente,
                                            identificacion=oferente.identificacion
                                        }).ToList();

                if (empleadoExterno != null && empleadoExterno.Any() && empleadoOferente != null && empleadoOferente.Any())
                {


                    return Json(new { empleadoExterno, empleadoOferente });

                }
                else if(empleadoExterno != null && empleadoExterno.Any() )
                {
                    return Json(new { empleadoExterno });

                }
                else if (empleadoOferente != null && empleadoOferente.Any())
                {
                    return Json(new { empleadoOferente });

                }
                else
                {
                    return Json(new { vacio = true });

                }

            }
            catch (SqlException sqlEx)
            {
                // Manejo de excepciones de SQL Server
                return Json(new { error = "Error en la base de datos: " + sqlEx.Message });
            }
            catch (Exception ex)
            {
                // Manejo de otras excepciones
                return Json(new { error = "Error desconocido: " + ex.Message });
            }


        }

        [HttpGet]
        public JsonResult GetEmpleadoGeneral(string identificacion, string identificacionReclutador)
        {



            identificacion = identificacion.Replace("-", "").Replace("_", "");


            try
            {
                var idReclutador = _context.Reclutador
                  .Where(o => o.identificacion == identificacionReclutador.Replace("-", ""))
                  .Select(o => o.idReclutador)
                  .FirstOrDefault();

                var idInstitucion = _context.Reclutador_Institucion
                    .Where(r => r.ID_RECLUTADOR == idReclutador)
                    .Select(r => r.ID_INSTITUCION)
                    .SingleOrDefault();

                //primero se busca si la identificacion se encuentra en los empleados registrados externamente

                var empleadoExterno = _context.EmpleadoExterno.Where(e => e.ID_INSTITUCION.Equals(idInstitucion))
                   .Select(e => new
                   {
                       id = e.idEmpleadoExterno,
                       identificacion = e.identificacion
                   }).SingleOrDefault();


                if (empleadoExterno != null)
                {
                    //se encontro en los empleados externos

                    return Json(new { empleadoExterno });

                }
                else 
                {
                    //se busca si la identificacion se encuentra en los empleados registrados como Oferentes
                    var idOferente = _context.Oferente
                       .Where(o => o.identificacion == identificacion)
                       .Select(o => o.idOferente)
                       .FirstOrDefault();

                    var empleadoOferente = (from empleado in _context.EmpleadoOferente
                                            where empleado.id_INSTITUCION == idInstitucion
                                            join oferente in _context.Oferente on empleado.idOferente equals oferente.idOferente
                                            select new
                                            {
                                                id = empleado.idEmpleadoOferente,
                                                identificacion = oferente.identificacion
                                            }).SingleOrDefault();

                    if (empleadoOferente != null)
                    {
                        //se encontro en los empleados oferentes

                        return Json(new { empleadoOferente });

                    }
                    else
                    {
                        return Json(new { vacio = true });
                    }


                }
      
            }
            catch (SqlException sqlEx)
            {
                // Manejo de excepciones de SQL Server
                return Json(new { error = "Error en la base de datos: " + sqlEx.Message });
            }
            catch (Exception ex)
            {
                // Manejo de otras excepciones
                return Json(new { error = "Error desconocido: " + ex.Message });
            }


        }



        [HttpGet]
        public JsonResult GetDatosPersonalesEmpleado(int idEmpleado)
        {
       
            try
            {
                var empleadoExterno = _context.EmpleadoExterno.Where(e => e.idEmpleadoExterno.Equals(idEmpleado))
                  .Select(e => new
                  {
                      identificacion = e.identificacion,
                      nombre=e.nombre,
                      apellidos=e.apellido1+" "+e.apellido2,
                      genero=(e.genero==1?"Masculino":"Femenino"),
                      fechaNacimiento=e.fechaNacimiento,
                      telefono=e.telefono,
                      correo=e.correo,
                      idProvincia=e.idProvincia,
                      idCanton=e.idCanton,
                      idDistrito=e.idDistrito,
                      direccion=e.direccion,
                      tipoEmpleado=e.tipoEmpleado,
                      estado= (e.estado == true ? '1' : '0')
                  }).SingleOrDefault();


                if (empleadoExterno != null)
                {
                    return Json(new { empleado=empleadoExterno });

                }
                else
                {
                    var empleadoOferente = (from empleado in _context.EmpleadoOferente
                                            where empleado.idEmpleadoOferente == idEmpleado
                                            join oferente in _context.Oferente on empleado.idOferente equals oferente.idOferente
                                            join ex in _context.Expediente on oferente.idOferente equals ex.idOferente
                                            select new
                                            {
                                                identificacion = oferente.identificacion.Trim(),
                                                nombre = oferente.nombre,
                                                apellidos = oferente.apellido1 + " " + oferente.apellido2,
                                                genero = (ex.genero == 1 ? "Masculino" : "Femenino"),
                                                fechaNacimiento = ex.nacimiento,
                                                telefono = oferente.telefono,
                                                correo = oferente.correo,
                                                idProvincia = ex.IdProvincia,
                                                idCanton = ex.IdCanton,
                                                idDistrito = ex.IdDistrito,
                                                direccion = ex.direccion,
                                                tipoEmpleado = empleado.tipoEmpleado,
                                                estado = empleado.estado
                                            }).SingleOrDefault();

                    if (empleadoOferente != null)
                    {
                        return Json(new { empleado=empleadoOferente });

                    }
                    else
                    {
                        return Json(new { exito=false });

                    }

                }

            }
            catch (SqlException sqlEx)
            {
                // Manejo de excepciones de SQL Server
                return Json(new { error = "Error en la base de datos: " + sqlEx.Message });
            }
            catch (Exception ex)
            {
                // Manejo de otras excepciones
                return Json(new { error = "Error desconocido: " + ex.Message });
            }


        }


    }
}
