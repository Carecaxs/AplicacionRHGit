using AplicacionRHGit.Data;
using AplicacionRHGit.Models;
using AplicacionRHGit.Models.Expedientes;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting.Internal;

namespace AplicacionRHGit.Controllers
{
    public class OferenteController : Controller
    {


        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor httpContextAccessor;

        public OferenteController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            this.httpContextAccessor = httpContextAccessor;
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
                    ViewBag.identificacion = identification;
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
                    ViewBag.correo = persona.correo;
                    ViewBag.telefono = persona.telefono;



                    //almacenar en un viewData los grupos profesionales para mostrarlo en un combo
                    OferentesDAO oferentesDAO = new OferentesDAO(_context);
                    List<GrupoProfesional> grupos = oferentesDAO.CargarGruposProfesionales();
                    // Pasar los datos a la vista
                    ViewData["GruposCombo"] = new SelectList(grupos, "idGrupoProfesional", "Codigo");


                    //almacenar en un viewData los grados academicos para mostrarlo en un combo
                    List<Idioma> idiomas = oferentesDAO.CargarIdiomas();
                    // Pasar los datos a la vista
                    ViewData["IdiomasCombo"] = new SelectList(idiomas, "idIdioma", "NombreIdioma");



                    List<Idioma> titulos = oferentesDAO.CargarIdiomaPersona(identification, clave);
                    if (titulos != null)
                    {
                        ViewData["IdiomaPersona"] = new SelectList(titulos, "idIdioma", "NombreIdioma");
                    }




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


        public IActionResult TitulosOferente(string identification, string clave)
        {
            if (!string.IsNullOrEmpty(identification) && !string.IsNullOrEmpty(clave))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Oferente", clave);

                if (persona != null)
                {
                    ViewBag.nombre = persona.nombre;
                    ViewBag.identificacion = identification;
                    ViewBag.clave = clave;
                    ViewBag.VistaActual = "TitulosOferente";

                    //almacenar en un viewData los grados academicos para mostrarlo en un combo
                    OferentesDAO oferentesDAO = new OferentesDAO(_context);
                    List<GradoAcademico> grados = oferentesDAO.CargarGradosAcademicos();
                    // Pasar los datos a la vista
                    ViewData["Grados"] = new SelectList(grados, "id", "gradoAcademico");



                    List<DETALLE_TITULO> titulos = oferentesDAO.CargarTitulos(identification, clave);
                    if (titulos != null)
                    {
                        ViewData["Titulos"] = new SelectList(titulos);
                    }



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


        public IActionResult ReferenciasOferente(string identification, string clave)
        {
            if (!string.IsNullOrEmpty(identification) && !string.IsNullOrEmpty(clave))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Oferente", clave);

                if (persona != null)
                {
                    ViewBag.nombre = persona.nombre;
                    ViewBag.identificacion = identification;
                    ViewBag.clave = clave;
                    ViewBag.VistaActual = "ReferenciasOferente";




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



        public IActionResult ExperienciaOferente(string identification, string clave)
        {
            if (!string.IsNullOrEmpty(identification) && !string.IsNullOrEmpty(clave))
            {
                ConsultasGeneralesDAO acceso = new ConsultasGeneralesDAO(_context);
                var persona = acceso.ObtenerDatosPersonaPorCedula(identification, "Oferente", clave);

                if (persona != null)
                {
                    ViewBag.nombre = persona.nombre;
                    ViewBag.identificacion = identification;
                    ViewBag.clave = clave;
                    ViewBag.VistaActual = "ExperienciaOferente";




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






        [HttpPost]
        public JsonResult GuardarCambiosDatosPersonalesEx(string identificacion, string nacimiento, int genero, int provincia, int canton, int distrito,
            string direccion, int grupoP)
        {
            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);


                if (acceso.GuardarCambiosDatosPersonalesEx(identificacion, nacimiento, genero, provincia, canton, distrito, direccion, grupoP) > 0)
                {
                    //si todo sale bien
                    return Json(new { mensaje = "Expediente actualizado exitosamente" });
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




        [HttpPost]
        public JsonResult AñadirIdiomaExpediente(string identificacion, int idIdioma)
        {
            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);

                int idRegistroAgregado=acceso.AñadirIdiomaExpediente(identificacion, idIdioma);

                if (idRegistroAgregado > 0)
                {
                    //si todo sale bien
                    return Json(new { exito=true });
                }
                else
                {
                    return Json(new { error = "Ya tienes este idioma agregado" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }




        [HttpGet]
        public JsonResult MostrarIdiomaLista(string identificacion, string clave)
        {
            OferentesDAO oferentesDAO = new OferentesDAO(_context);
            var idioma = oferentesDAO.CargarIdiomaPersona(identificacion,clave);

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



        [HttpPost]
        public JsonResult EliminarIdioma(string idIdioma, string identificacion)
        {
            try
            {
                OferentesDAO oferentesDAO = new OferentesDAO(_context);
                if (oferentesDAO.EliminarIdioma(idIdioma, identificacion) == 1)
                {

                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { error = "Hubo un problema al eliminar el idioma" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }











        ////////////////////////////////////////////////   seccion titulos ///////////////////////////////////////////////////////
        [HttpPost]
        public JsonResult AgregarTitulo(IFormCollection formData)
        {

            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);
                int idTitulo = acceso.AgregarTitulo(formData);

                if (idTitulo != -1)
                {
                    var fotoTitulo = formData.Files["fotoTitulo"];
                    if (fotoTitulo != null && fotoTitulo.Length > 0)
                    {
                        // Obtener la ruta donde se guardará la imagen (usando el número de cédula como nombre de carpeta)
                        var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();


                        var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesTitulos", formData["identificacion"].FirstOrDefault());


                        // Crear la carpeta si no existe
                        if (!Directory.Exists(carpetaCedula))
                        {
                            Directory.CreateDirectory(carpetaCedula);
                        }

                        // Obtener la extensión del archivo
                        var extension = Path.GetExtension(fotoTitulo.FileName);

                        // Crear un nombre único para la imagen (id del detalle_titulo)
                        var nombreImagen = $"{idTitulo}{extension}";

                        // Obtener la ruta completa de la imagen
                        var rutaImagen = Path.Combine(carpetaCedula, nombreImagen);

                        // Guardar la imagen en el servidor
                        using (var stream = new FileStream(rutaImagen, FileMode.Create))
                        {
                            fotoTitulo.CopyTo(stream);
                        }

                    }

                    return Json(new { exito = true });


                }
                else
                {
                    return Json(new { error = "Hubo un problema al guardar el titulo" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }


        [HttpGet]
        public JsonResult CargarTitulos(string identificacion, string clave)
        {
            var idOferente = _context.Oferente
                .Where(o => o.identificacion == identificacion && o.clave == clave)
                .Select(o => o.idOferente)
                .FirstOrDefault();

            var idExpediente = _context.Expediente
                .Where(e => e.idOferente == idOferente)
                .Select(e => e.ID_EXPEDIENTE)
                .FirstOrDefault();

            var idTitulo = _context.Titulo
                .Where(t => t.ID_EXPEDIENTE == idExpediente)
                .Select(t => t.ID_TITULO)
                .FirstOrDefault();

            var titulos = _context.DetalleTitulo
                        .Where(dt => dt.ID_TITULO == idTitulo)
                        .Join(
                            _context.GradoAcademico,
                            dt => dt.TIPO_TITULO,
                            ga => ga.id,
                            (dt, ga) => new
                            {
                                dt.ID_DETALLE_TITULOS,
                                dt.ESPECIALIDAD,
                                dt.ESTADO,
                                dt.ASIENTO,
                                ga.gradoAcademico
                            }
                        ).ToList();

            return Json(titulos);
        }



        [HttpPost]
        public JsonResult EliminarTitulo(string idTitulo, string identificacion)
        {
            try
            {
                OferentesDAO oferentesDAO = new OferentesDAO(_context);
                if (oferentesDAO.EliminarTitulo(idTitulo) == 1)
                {
                    //eliminar foto de ese titulo
                    var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
                    var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesTitulos", identificacion);


                    // Buscar el archivo en el directorio
                    string[] archivos = Directory.GetFiles(carpetaCedula, idTitulo + ".*");

                    if (archivos.Length > 0)
                    {
                        if (System.IO.File.Exists(archivos[0]))
                        {
                            // Elimina el archivo
                            System.IO.File.Delete(archivos[0]);

                        }

                    }

                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { error = "Hubo un problema al eliminar el titulo" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }

        [HttpGet]
        public JsonResult MostrarTitulo(string idTitulo, string identificacion)
        {
            OferentesDAO oferentesDAO = new OferentesDAO(_context);
            var titulo = oferentesDAO.MostrarTitulo(idTitulo);

            try
            {

                if (titulo != null)
                {
                    return Json(titulo);

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


       



        [HttpPost]
        public JsonResult ActualizarTitulo(IFormCollection formData)
        {
            var fotoTitulo = formData.Files["fotoTitulo"];
            OferentesDAO acceso = new OferentesDAO(_context);

            if (fotoTitulo != null && fotoTitulo.Length > 0)
            {
                //eliminar foto existente y agregar la nueva

                if (acceso.ActualizarTitulo(formData) == 1)
                {
                    var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
                    var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesTitulos", formData["identificacion"].FirstOrDefault());


                    // Buscar el archivo en el directorio
                    string[] archivos = Directory.GetFiles(carpetaCedula, formData["idTitulo"].FirstOrDefault() + ".*");

                    if (archivos.Length > 0)
                    {
                        if (System.IO.File.Exists(archivos[0]))
                        {
                            // Elimina el archivo
                            System.IO.File.Delete(archivos[0]);

                        }

                    }


                    //ahora vamos agregar la nueva imagen
                    var extension = Path.GetExtension(fotoTitulo.FileName);

                    // Crear un nombre único para la imagen (id del detalle_titulo)
                    var nombreImagen = $"{formData["idTitulo"].FirstOrDefault()}{extension}";

                    // Obtener la ruta completa de la imagen
                    var rutaImagen = Path.Combine(carpetaCedula, nombreImagen);

                    // Guardar la imagen en el servidor
                    using (var stream = new FileStream(rutaImagen, FileMode.Create))
                    {
                        fotoTitulo.CopyTo(stream);
                    }


                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { exito = false });

                }
            }
            else
            {
                //se actualizan los datos sin cambiar la imagen
                if (acceso.ActualizarTitulo(formData) == 1)
                {
                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { exito = false });

                }
            }



        }




        ///////////////////////////////////////////////////////    SECCION REFERENCIAS ////////////////////////////////////////////////////////////////

        [HttpPost]
        public JsonResult AgregarReferecia(IFormCollection formData)
        {

            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);
                int idReferencia = acceso.AgregarReferecia(formData);

                if (idReferencia != -1)
                {
                    var fotoReferencia = formData.Files["fotoReferencia"];
                    if (fotoReferencia != null && fotoReferencia.Length > 0)
                    {
                        // Obtener la ruta donde se guardará la imagen (usando el número de cédula como nombre de carpeta)
                        var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();


                        var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesReferencias", formData["identificacion"].FirstOrDefault());


                        // Crear la carpeta si no existe
                        if (!Directory.Exists(carpetaCedula))
                        {
                            Directory.CreateDirectory(carpetaCedula);
                        }

                        // Obtener la extensión del archivo
                        var extension = Path.GetExtension(fotoReferencia.FileName);

                        // Crear un nombre único para la imagen (id del detalle_titulo)
                        var nombreImagen = $"{idReferencia}{extension}";

                        // Obtener la ruta completa de la imagen
                        var rutaImagen = Path.Combine(carpetaCedula, nombreImagen);

                        // Guardar la imagen en el servidor
                        using (var stream = new FileStream(rutaImagen, FileMode.Create))
                        {
                            fotoReferencia.CopyTo(stream);
                        }

                    }

                    return Json(new { exito = true });


                }
                else
                {
                    return Json(new { error = "Hubo un problema al guardar la referencia" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }



        [HttpGet]
        public JsonResult CargarReferenciasPersonales(string identificacion, string clave)
        {
            try
            {

                OferentesDAO acceso = new OferentesDAO(_context);

                List<DETALLE_REFERENCIAS> referencias = acceso.CargarReferenciasPersonales(identificacion, clave);    

                if(referencias!=null)
                {
                    return Json(referencias);
                }
                else
                {
                   return Json(new { vacio=true });

                }


            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }


        [HttpPost]
        public JsonResult EliminarReferencia(string idReferencia, string identificacion)
        {
            try
            {
                OferentesDAO oferentesDAO = new OferentesDAO(_context);
                if (oferentesDAO.EliminarReferencia(idReferencia) == 1)
                {
                    //eliminar foto de ese titulo
                    var hostingEnvironment = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
                    var carpetaCedula = Path.Combine(hostingEnvironment.WebRootPath, "ImagesReferencias", identificacion);


                    // Buscar el archivo en el directorio
                    string[] archivos = Directory.GetFiles(carpetaCedula, idReferencia + ".*");

                    if (archivos.Length > 0)
                    {
                        if (System.IO.File.Exists(archivos[0]))
                        {
                            // Elimina el archivo
                            System.IO.File.Delete(archivos[0]);

                        }

                    }

                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { error = "Hubo un problema al eliminar la referencia" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }




        ///////////////////////////////////////////////////////    SECCION EXPERIENCIAS ////////////////////////////////////////////////////////////////

        [HttpPost]
        public JsonResult AgregarExperiencia(IFormCollection formData)
        {

            try
            {
                OferentesDAO acceso = new OferentesDAO(_context);
                int idExperiencia = acceso.AgregarExperiencia(formData);

                if (idExperiencia != -1)
                {                   

                    return Json(new { exito = true });


                }
                else
                {
                    return Json(new { error = "Hubo un problema al guardar la experiencia laboral" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }
        }



        [HttpGet]
        public JsonResult CargarExperiencias(string identificacion, string clave)
        {
            try
            {

                OferentesDAO acceso = new OferentesDAO(_context);

                List<DETALLE_EXPERIENCIA> experiencias = acceso.CargarExperiencias(identificacion, clave);

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




        [HttpPost]
        public JsonResult EliminarExperiencia(string idExperiencia, string identificacion)
        {
            try
            {
                OferentesDAO oferentesDAO = new OferentesDAO(_context);
                if (oferentesDAO.EliminarExperiencia(idExperiencia) == 1)
                {
                   

                    return Json(new { exito = true });

                }
                else
                {
                    return Json(new { error = "Hubo un problema al eliminar la referencia" });

                }

            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });

            }


        }

    }



}




